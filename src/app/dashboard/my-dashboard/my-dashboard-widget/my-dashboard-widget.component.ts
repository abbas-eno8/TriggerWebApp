import { Component, OnInit, Input } from '@angular/core';
import { DashboardPresenter } from '../../dashboard-presenter/dashboard.presenter';
import { DashboardService } from '../../dashboard-service/dashboard.service';
import { GlobalResponseHandlerService } from '../../../core/global-response-handler/global-response-handler';
import { LoaderService } from '../../../core/loader/loader.service';
import { CustomValidation } from '../../../shared/Validation/custom.validation';
import { ManagerListModal, RequestForSpark, RequestForTrigger } from '../../dashboard-model';

@Component({
  selector: 'trigger-my-dashboard-widget',
  templateUrl: './my-dashboard-widget.component.html',
  styleUrls: ['./my-dashboard-widget.component.scss']
})
export class MyDashboardWidgetComponent implements OnInit {
  @Input() isRequestForTrigger: boolean;
  @Input() isRequestForSpark: boolean;
  public userData: any;
  constructor(private dashboardPresenter: DashboardPresenter,
    private dashboardService: DashboardService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private loaderService: LoaderService,
    private customValidation: CustomValidation) {
    this.userData = this.globalResponseHandlerService.getUserData();
  }

  ngOnInit() {
  }

  /**
 * Author : Mihir Patel
 * Modified-Date : 16-12-2019
 * Description : Create a method for get manager list and if managers data get then open request modal with manager list for request for spark: 
 */
  onClickOpenRequestModal(requestType) {
    let request: string
    if (requestType === 1) {
      request = RequestForTrigger;
    } else {
      request = RequestForSpark;
    }
    this.loaderService.emitIsLoaderShown(true);
    this.dashboardService.getManagerList(this.userData.employee.empId, requestType).subscribe((managerListResponse) => {
      if (this.globalResponseHandlerService.getApiResponse(managerListResponse, false)) {
        let managerList: ManagerListModal[];
        managerList = managerListResponse.data.map(data => ({
          empId: data.empId,
          empStatus: data.empStatus,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.firstName + ' ' + data.lastName
        }));
        managerList = managerList.sort((a, b) => this.customValidation._sortAlphanumeric(a.firstName, b.firstName))
        this.dashboardPresenter.openRequestModal(managerList, request, false);
      }
    })
  }

}
