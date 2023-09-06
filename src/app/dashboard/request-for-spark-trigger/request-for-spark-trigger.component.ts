/**
@author : Mihir Patel
@class : RequestForSparkTriggerComponent
@description :RequestForSparkTriggerComponent is created for Multi select manager functionality
**/
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ElementRef, HostBinding } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { ManagerListModal, DashboardErrorMessage, OpenRequestSelectDropdownClass, RequestForTrigger } from '../dashboard-model';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { ToasterService } from 'angular2-toaster';
import { DashboardService } from '../dashboard-service/dashboard.service';
import { GlobalResponseHandlerService } from '../../core/global-response-handler/global-response-handler';
import { CdkOverlayPane } from '../../core/magic-string/common.model';
import { LoaderService } from '../../core/loader/loader.service';
import { GlobalEventsManager } from '../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-request-for-spark-trigger',
  templateUrl: './request-for-spark-trigger.component.html',
  styleUrls: ['./request-for-spark-trigger.component.scss']
})

export class RequestForSparkTriggerComponent implements OnInit {
  // Input property of manager list : 
  @Input() data: any;
  // Dynamic header of request for trigger or spark : 
  @Input() _header: string;
  /** This property is used for get team-members response from container component */
  @Input() public set header(header: string) {
    if (header) {
      this._header = header;
      this.selectInitialValue = header === RequestForTrigger ? "Select Evaluator" : "Select Team Member";
      this.placeholderValue = header === RequestForTrigger ? 'Search Evaluator...' : 'Search Team Member...';
    }
  }
  // Output cancel emitter for cancel overlay popup :
  @Output() cancel: EventEmitter<boolean>;
  // Output update emitter for update value overlay popup :
  @Output() update: EventEmitter<object>;
  // View child for mat select :
  // @ViewChild(MatSelect, { static: false }) mySelector: MatSelect;
  @ViewChild(MatSelect, { static: false })
  selectComponent;

  @ViewChild('modalElement', { static: false }) modalElement: ElementRef;
  // Declare variable for store selected manager list :
  public selectInitialValue: string;
  // Declare variable for store selected manager list :
  public placeholderValue: string;
  // Declare variable for store selected manager list :
  public selectedManagers: ManagerListModal[];
  // Declare managers for store manager list : 
  public managers: ManagerListModal[];
  // isDisableApply declare and use for manage boolean variable for Enable/Disable Apply button :
  public isDisableApply: boolean = false;
  /** control for the MatSelect filter keyword multi-selection */
  public managerMultiFilterCtrl: FormControl = new FormControl();
  // filteredManagerMulti defined as ReplaySubjectf
  public filteredManagerMulti: ReplaySubject<ManagerListModal[]> = new ReplaySubject<ManagerListModal[]>(1);
  // onDestroy subject defined
  protected _onDestroy = new Subject<void>();
  public matOpen: boolean;
  public remarks: string;
  public isDarkTheme: boolean;
  public themeEmitter: any;
  constructor(private toasterService: ToasterService,
    private dashboardService: DashboardService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private globalEventsManager: GlobalEventsManager) {
    this.cancel = new EventEmitter();
    this.update = new EventEmitter();
    this.selectedManagers = []
    this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
      if (status) {
        this.isDarkTheme = true;
      } else {
        this.isDarkTheme = false;
      }
    })
  }

  @HostBinding('@.disabled')
  disableAnimation = true;

  ngOnInit() {
    this.getManagers();
  }

  // Subscribe backdrop click for remove class from modal
  ngAfterViewInit() {
    this.selectComponent.overlayDir.backdropClick.subscribe(evt => {
      this.modalElement.nativeElement.classList.remove('box-height');
      // this.selectedManagers = [];
    });
  }

  openSelectDropdown() {
    this.modalElement.nativeElement.classList.add('box-height');
    var parentElement = document.getElementsByClassName(CdkOverlayPane)[1];
    if (parentElement) {
      parentElement.classList.remove('open-request-select-dropdown-with-selected-manager')
      parentElement.classList.remove(OpenRequestSelectDropdownClass)
    };
    if (this.selectedManagers.length > 0) {
      if (parentElement) { parentElement.classList.add('open-request-select-dropdown-with-selected-manager') };
    } else {
      if (parentElement) { parentElement.classList.add(OpenRequestSelectDropdownClass) };
    }
    this.addClassDynamic();
  }

  /**
  * Author : Mihir Patel
  * Modified-Date : 27-11-2019
  * Description : Create a method for set value of manager list
  */
  getManagers() {
    this.managers = this.data;
    this.callAfterGetDepartment();
  }

  callAfterGetDepartment() {
    this.filteredManagerMulti.next(this.managers.slice());
    // listen for search field value changes
    this.managerMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDepartmentsMulti();
      });
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.empId === objTwo.empId;
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 27-11-2019
   * Description : Create a method for Manage search manager functionality
   */
  protected filterDepartmentsMulti() {
    if (!this.managers) {
      return;
    }
    // get the search keyword
    let search = this.managerMultiFilterCtrl.value;

    if (!search) {
      this.filteredManagerMulti.next(this.managers.slice());
      this.isDisableApply = false;
      return;
    } else {
      search = search.toLowerCase();
      this.isDisableApply = true;
    }
    // filter the departments
    this.filteredManagerMulti.next(
      this.managers.filter(manager => manager.fullName.toLowerCase().indexOf(search) > -1)
    );
  }


  /**
   * Author : Mihir Patel
   * Modified-Date : 27-11-2019
   * Description : Create a method for emit and update value of select all managers 
   */
  selectAll(select: NgModel, values, managers) {
    if (!!this.managerMultiFilterCtrl.value) {
      let selectedArray = values._events[0].value;
      let localArray = []
      selectedArray.forEach(element => {
        let isExistObject = this.selectedManagers.filter(c => (c === element))
        if (isExistObject.length === 0) {
          this.selectedManagers.push(element);
        }
      });
      this.selectedManagers.forEach(element => {
        localArray.push(element);
      });
      select.update.emit(localArray);
    } else {
      select.update.emit(managers);
    }

  }

  /**
   * Author : Mihir Patel
   * Modified-Date : 27-11-2019
   * Description : Create a method for emit and update value of deselect all managers 
   */
  deselectAll(select: NgModel, values) {
    if (!!this.managerMultiFilterCtrl.value) {
      let lastArray = []
      let deSelectedArray = []
      deSelectedArray = values._events[0].value;

      this.selectedManagers.forEach(element => {
        let isExistObject = deSelectedArray.filter(c => (c.empId === element.empId))
        if (isExistObject.length === 0) {
          lastArray.push(element)
        }
      });
      this.selectedManagers = lastArray;
      select.update.emit(lastArray);
    } else {
      this.selectedManagers = [];
      select.update.emit([]);
    }

  }

  /**
 * Author : Mihir Patel
 * Created-Date : 27-11-2019
 * Descriotion : Create method for submit request and check array length and based on that send request api called.
 */
  submitRequest() {
    if (this.selectedManagers.length === 0) {
      this.toasterService.pop('error', '', DashboardErrorMessage.SelectAtleasetOneManager);
    } else if (this.selectedManagers.length > 0) {
      this.sendRequest(this.selectedManagers);
    }
  }

  /**
  * Author : Mihir Patel
  * Created-Date : 27-11-2019
  * Modified-Date : 16-12-2019
  * Descriotion : Create method for server call of send request and update emmiter for close modal.
  */
  private sendRequest(selectedManagers): void {
    this.loaderService.emitIsLoaderShown(true);
    let arrayOfId = [];
    let header = this._header;
    selectedManagers.forEach(elem => {
      arrayOfId.push(elem.empId);
    })
    let arrayString = arrayOfId.join();

    if (!!arrayString) {
      let requestObject = {
        EmpId: this.globalResponseHandlerService.getUserData().loginEmpId,
        EmpIdList: arrayString,
        Remarks: this.remarks,
        actionid: header == RequestForTrigger ? 1 : 2,
        createdby: this.globalResponseHandlerService.getUserData().userId
      }
      this.dashboardService.sendRequestToManager(requestObject).subscribe((response) => {
        if (this.globalResponseHandlerService.getApiResponse(response, true)) {
          this.selectedManagers = [];
          this.update.emit()
          this.globalEventsManager.updateCreateRequestList(true);
        }
      })
    }

  }

  /**
* Author : Mihir Patel
* Created-Date : 26-11-2019
* Descriotion : Create method for emit value for close overlay modal popup.
*/
  cancelSelection(): void {
    this.cancel.emit(true)
  }

  /**
  * Author : Mihir Patel
  * Modified-Date :  05-05-2019
  * Description : Method for destroy component.
  */
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.themeEmitter.unsubscribe();
  }

  addClassDynamic() {
    if (this.isDarkTheme) {
      this.addDarkTheme();
    } else {
      this.removeDarkTheme();
    }
  }

  addDarkTheme() {
    let parentElement = document.getElementsByClassName("custom-overflow")[0];
    parentElement.classList.remove('light-theme-mat-select');
    parentElement.classList.add('dark-theme-mat-select');

    let parentElementOne = document.getElementsByClassName("search-class")[0];
    parentElementOne.classList.remove('light-theme-mat-select');
    parentElementOne.classList.add('dark-theme-mat-select');

    let parentElementTwo = document.getElementsByClassName("button-group-container")[0];
    parentElementTwo.classList.remove('light-theme-mat-select');
    parentElementTwo.classList.add('dark-theme-mat-select');
  }
  removeDarkTheme() {
    let parentElement = document.getElementsByClassName("custom-overflow")[0];
    parentElement.classList.remove('dark-theme-mat-select');
    parentElement.classList.add('light-theme-mat-select');

    let parentElementOne = document.getElementsByClassName("search-class")[0];
    parentElementOne.classList.remove('dark-theme-mat-select');
    parentElementOne.classList.add('light-theme-mat-select');

    let parentElementTwo = document.getElementsByClassName("button-group-container")[0];
    parentElementTwo.classList.remove('dark-theme-mat-select');
    parentElementTwo.classList.add('light-theme-mat-select');
  }
}

