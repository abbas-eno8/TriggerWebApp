/**
@author : Mihir Patel
@class : SelectDepartmentComponent
@description :SelectDepartmentComponent is created for Multi select dropdown functionality
**/
import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { ToasterService } from 'angular2-toaster';
import { DashboardErrorMessage } from '../manager-dashboard-model';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { Encryption } from '../../../core/magic-string/common-validation-model';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';

@Component({
  selector: 'trigger-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectDepartmentComponent implements OnInit, OnDestroy {
  public isDepartment: boolean = false;
  @ViewChild(MatSelect, {static: false}) mySelector: MatSelect;
  // @Input() disableInitialFocus = true;
  public departments: any;
  public selectedDepartments: any;
  public isDisableApply: boolean = false;
  public localArray: any = [];
  public selectedArrayLength: Array<any> = [];

  @Output() dashboardFromDepartment: EventEmitter<number> = new EventEmitter();

  public bankMultiCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword multi-selection */
  public departmentMultiFilterCtrl: FormControl = new FormControl();
  public isDarkTheme: boolean;
  public isInitialLoad: boolean;
  public themeEmitter: any;
  constructor(private toasterService: ToasterService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private globalEventsManager: GlobalEventsManager) {
      this.themeEmitter = this.globalEventsManager.updateThemeEmitter.subscribe((status) => {
        if (status) {
          this.isDarkTheme = true;         
        } else {
          this.isDarkTheme = false;
        }
      })
  }

  public filteredDepartmentMulti: ReplaySubject<Department[]> = new ReplaySubject<Department[]>(1);

  @ViewChild('multiSelect', {static: false}) multiSelect: MatSelect;

  protected _onDestroy = new Subject<void>();

  ngOnInit() {

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
  addLightTheme() { 
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

  addClassDynamic(){
    if(this.isDarkTheme){
      this.addDarkTheme();
    } else {
      this.addLightTheme();
    }
  }
  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method for get department data from dashboard
   */
  getDepartments(departments) {
    if (!!departments) {
      this.departments = departments;
      this.isDepartment = true;
      this.selectedDepartments = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey));
      if (this.selectedDepartments === null || this.selectedDepartments === undefined) {
        this.selectedDepartments = this.departments;
      } else {
        this.selectedDepartments.forEach((element, index) => {
          let isExistObject = this.departments.filter(c => (c.id === element.id))
          if (isExistObject.length === 0) {
            this.selectedDepartments.splice(index,1);
          }
        });  
      }      
      this.selectedArrayLength = this.selectedDepartments;      
      this.globalResponseHandlerService.encriptData(JSON.stringify(this.selectedDepartments), Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey)
      this.callAfterGetDepartment();
      // this.setInitialValue();
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method for initialize array and assign value of department
   */
  // protected setInitialValue() {
  //   this.filteredDepartmentMulti
  //     .pipe(take(1), takeUntil(this._onDestroy))
  //     .subscribe(() => {
  //       // setting the compareWith property to a comparison function
  //       // triggers initializing the selection according to the initial value of
  //       // the form control (i.e. _initializeSelection())
  //       // this needs to be done after the filteredDepartments are loaded initially
  //       // and after the mat-option elements are available
  //       this.multiSelect.compareWith = (a: Department, b: Department) => a && b && a.id === b.id;
  //     });
  // }

  callAfterGetDepartment() {
    this.filteredDepartmentMulti.next(this.departments.slice());
    // listen for search field value changes
    this.departmentMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDepartmentsMulti();
      });
  }

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method for Manage search department functionality
   */
  protected filterDepartmentsMulti() {
    if (!this.departments) {
      return;
    }
    // get the search keyword
    let search = this.departmentMultiFilterCtrl.value;

    if (!search) {
      this.filteredDepartmentMulti.next(this.departments.slice());
      this.isDisableApply = false;
      return;
    } else {
      search = search.toLowerCase();
      this.isDisableApply = true;
    }
    // filter the departments
    this.filteredDepartmentMulti.next(
      this.departments.filter(department => department.name.toLowerCase().indexOf(search) > -1)
    );
  }


  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method for emit and update value of select all department 
   */
  selectAll(select: NgModel, values, departments) {
    if (!!this.departmentMultiFilterCtrl.value) {
      let selectedArray = values._events[0].value;
      let localArray = []
      selectedArray.forEach(element => {
        let isExistObject = this.selectedDepartments.filter(c => (c === element))
        if (isExistObject.length === 0) {
          this.selectedDepartments.push(element);
        }
      });
      this.selectedDepartments.forEach(element => {
        localArray.push(element);
      });
      select.update.emit(localArray);
    } else {
      select.update.emit(departments);
    }

  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method for emit and update value of deselect all department 
   */
  deselectAll(select: NgModel, values) {
    if (!!this.departmentMultiFilterCtrl.value) {
      let lastArray = []
      let deSelectedArray = []
      deSelectedArray = values._events[0].value;

      this.selectedDepartments.forEach(element => {
        let isExistObject = deSelectedArray.filter(c => (c.id === element.id))
        if (isExistObject.length === 0) {
          lastArray.push(element)
        }
      });
      this.selectedDepartments = lastArray;
      select.update.emit(lastArray);
    } else {
      this.selectedDepartments = [];
      select.update.emit([]);
    }

  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method for Submit selected department and emit value to dashboard component for get manager dashboard by selected department
   */
  submitDepartment() {
    this.selectedArrayLength = this.selectedDepartments;
    if (this.selectedDepartments.length === 0) {
      this.toasterService.pop('error', '', DashboardErrorMessage.SelectAtleasetOneDepartment);
    } else if (this.selectedDepartments.length > 0) {
      this.globalResponseHandlerService.encriptData(JSON.stringify(this.selectedDepartments), Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey)
      this.dashboardFromDepartment.emit(this.selectedDepartments);
      this.mySelector.close();
    }
  }

  /**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create a method handle event of open dropdown
   */
  openSelectDropdown() {
    this.addClassDynamic()
    this.selectedDepartments = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey));
    if (this.selectedDepartments === null || this.selectedDepartments === undefined) {
      this.selectedDepartments = this.departments;
    }
  }

   /**
   * Author : Mihir Patel
   * Modified-Date :  06-05-2019
   * Description : Create a method handle event of open close dropdown
   */
  openedChange(opened: boolean) {    
    if(!opened){
      this.selectedDepartments = JSON.parse(this.globalResponseHandlerService.decriptData(Encryption.TriggerSelectDepartmentMessage, Encryption.TriggerSelectDepartmentKey));
      if (this.selectedDepartments === null || this.selectedDepartments === undefined) {
        this.selectedDepartments = this.departments;
      }
    }
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

}

/**
   * Author : Mihir Patel
   * Modified-Date :  05-05-2019
   * Description : Create interface for save data of department object type.
   */
export interface Department {
  id: number;
  name: string;
}