import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DashboardService } from '../../dashboard-service/dashboard.service';
import { CreateRequest, MyRequest, CreateRequestSearchField, MyRequestSearchField, Completed, Pending, OnGoing, DateFormat, MyRequestConst, CreateRequestConst } from '../../dashboard-model';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe.pipe';
import { LoaderService } from '../../../core/loader/loader.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import * as moment from 'moment';
import { DateTimeConverterService } from '../../../shared/services/date-time-converter/date-time-converter.service';
import { GlobalEventsManager } from '../../../core/navbar/globalEventsManager';
import { Role } from '../../../core/magic-string/common.model';

@Component({
  selector: 'trigger-my-dashboard-list',
  templateUrl: './my-dashboard-list.component.html',
  styleUrls: ['./my-dashboard-list.component.scss']
})
export class MyDashboardListComponent implements OnInit {
  public isActiveMyRequest: boolean;
  public isActiveCreateRequest: boolean;
  public isAccordianTable: boolean;
  public mainCreateRequestList: CreateRequest[];
  public createRequestList: CreateRequest[];
  public searchText: string;
  public isCreateRequestAiCalled: boolean;

  public mainMyRequestList: MyRequest[];
  public myRequestList: MyRequest[];
  public isMyRequestAiCalled: boolean;
  public filterByDate: boolean;
  public filteredCreateRequest: CreateRequest[];
  public filteredMyRequest: MyRequest[];
  public isActiveOngoing: boolean;
  public isActiveHistory: boolean;
  public userData: any;

  constructor(public breakpointObserver: BreakpointObserver,
    private dashboardService: DashboardService,
    private searchPipePipe: SearchPipePipe,
    private loaderService: LoaderService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private dateTimeConverterService: DateTimeConverterService,
    private globalEventsManager: GlobalEventsManager) {

    // Calling media matcher method for get screen resolution
    this.breakpointObserver
      .observe(['(min-width: 1250px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isAccordianTable = false;
        } else {
          this.isAccordianTable = true;
        }
      });
    this.globalEventsManager.updateMyDashboardListEmitter.subscribe((status) => {
      if (status) {
        if (this.isActiveCreateRequest) {
          this.loadCreateRequest();
        }
      }
    })
    this.userData = this.globalResponseHandlerService.getUserData()
    if (this.userData.roleId !== Role.Employee) {
      this.loadMyRequest();
    } else {
      this.loadCreateRequest()
    }
  }

  ngOnInit() {
    this.searchText = '';
    // this.loadCreateRequest()
  }

  filterItem(value, tableType) {
    if (tableType === MyRequestConst) {
      if (this.filterByDate) {
        this.myRequestList = this.searchPipePipe.transform(this.filteredMyRequest, this.searchText, MyRequestSearchField)
      } else {
        if (!value) {
          this.myRequestList = this.mainMyRequestList;
        } else {
          this.myRequestList = this.mainMyRequestList;
          this.myRequestList = this.searchPipePipe.transform(this.myRequestList, this.searchText, MyRequestSearchField)
        }
      }

    } else {
      if (this.filterByDate) {
        this.createRequestList = this.searchPipePipe.transform(this.filteredCreateRequest, this.searchText, CreateRequestSearchField)
      } else {
        if (!value) {
          this.createRequestList = this.mainCreateRequestList;
        } else {
          this.createRequestList = this.mainCreateRequestList;
          this.createRequestList = this.searchPipePipe.transform(this.createRequestList, this.searchText, CreateRequestSearchField)
        }
      }

    }
  }

  filteredByStatus(status, tableType) {
    if (status === OnGoing) {
      this.isActiveOngoing = true;
      this.isActiveHistory = false
    } else {
      this.isActiveOngoing = false;
      this.isActiveHistory = true
    }
    this.filterByDate = true;
    this.searchText = '';
    if (tableType === CreateRequestConst) {
      this.createRequestList = this.mainCreateRequestList;
      this.createRequestList = this.checkAndFilterRequestByDate(this.createRequestList, status)
      this.filteredCreateRequest = this.createRequestList
    } else {
      this.myRequestList = this.mainMyRequestList;
      this.myRequestList = this.checkAndFilterRequestByDate(this.myRequestList, status)
      this.filteredMyRequest = this.myRequestList;
    }
  }

  checkAndFilterRequestByDate(requestArray, filterType) {
    let UtcDate = this.dateTimeConverterService.getUtcDateTime();
    let formateDate = moment(UtcDate).utc().format(DateFormat)
    let filteredArray = [];
    if (filterType === 'History') {
      filteredArray = requestArray.filter(data => (moment(data.createdDate).utc().format(DateFormat) !== formateDate) || (moment(data.createdDate).utc().format(DateFormat) === formateDate && data.status === Completed));
    } else {
      filteredArray = requestArray.filter(data => (moment(data.createdDate).utc().format(DateFormat) == formateDate) && (data.status === Pending));
    }
    return filteredArray
  }

  public loadCreateRequest() {
    this.searchText = '';
    this.filterByDate = false;
    this.isActiveMyRequest = false;
    this.isActiveCreateRequest = true;
    this.isCreateRequestAiCalled = false;
    this.isMyRequestAiCalled = false;
    this.isActiveOngoing = true;
    this.isActiveHistory = false;
    this.mainCreateRequestList = [];
    this.createRequestList = [];
    this.loaderService.emitIsLoaderShown(true);
    this.dashboardService.getCreateRequestList().subscribe((createListResponse) => {
      this.isCreateRequestAiCalled = true;
      if (this.globalResponseHandlerService.getApiResponse(createListResponse, false)) {
        this.mainCreateRequestList = createListResponse.data.map(data => ({
          id: data.id + '',
          managerId: data.managerId,
          actionId: data.actionId,
          action: data.action,
          requestStatus: data.requestStatus,
          status: data.requestStatus == 1 ? Completed : Pending,
          managerFirstName: data.managerFirstName,
          managerLastName: data.managerLastName,
          createdDate: (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(data.createdDate))).toString(),
          managerName: data.managerFirstName + ' ' + data.managerLastName,
          remarks: !!data.remarks? data.remarks : ''
        }))
        this.createRequestList = this.mainCreateRequestList;
        this.createRequestList = this.sortData(this.createRequestList)
        // this.createRequestList = this.checkAndFilterRequestByDate(this.createRequestList, OnGoing)
      }
    })
  }

  public loadMyRequest(): void {
    this.searchText = '';
    this.filterByDate = false;
    this.isActiveMyRequest = true;
    this.isActiveCreateRequest = false;
    this.isMyRequestAiCalled = false;
    this.isCreateRequestAiCalled = false;
    this.isActiveOngoing = true;
    this.isActiveHistory = false
    this.mainMyRequestList = [];
    this.myRequestList = [];
    this.loaderService.emitIsLoaderShown(true);
    this.dashboardService.getMyRequestList().subscribe((myRequestListResponse) => {
      this.isMyRequestAiCalled = true;
      if (this.globalResponseHandlerService.getApiResponse(myRequestListResponse, false)) {
        this.mainMyRequestList = myRequestListResponse.data.map(data => ({
          id: data.id + '',
          empId: data.empId,
          actionId: data.actionId,
          action: data.action,
          requestStatus: data.requestStatus,
          status: data.requestStatus == 1 ? Completed : Pending,
          requestStatusName: data.requestStatusName,
          firstName: data.firstName,
          lastName: data.lastName,
          createdDate: (this.dateTimeConverterService.getLocalDateTimeFromUtcDateTime(new Date(data.createdDate))).toString(),
          requesterName: data.firstName + ' ' + data.lastName,
          remarks: !!data.remarks ? data.remarks : ''
        }));
        this.myRequestList = this.mainMyRequestList;
        this.myRequestList = this.sortData(this.myRequestList)
        // this.myRequestList = this.checkAndFilterRequestByDate(this.myRequestList, OnGoing)

      }
    })
  }
  sortData(data) {
    return data.sort((a, b) => {
      return <any>new Date(b.createdDate) - <any>new Date(a.createdDate);
    });
  }
}
