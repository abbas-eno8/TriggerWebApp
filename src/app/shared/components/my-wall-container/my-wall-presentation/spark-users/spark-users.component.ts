import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { GlobalResponseHandlerService } from '../../../../../core/global-response-handler/global-response-handler';
import { MyWallService } from '../../../../../shared/services/my-wall-service/my-wall.service';

@Component({
  selector: 'trigger-spark-users',
  templateUrl: './spark-users.component.html',
  styleUrls: ['./spark-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SparkUsersComponent implements OnInit {

  @Input() public sparkCount: number;
  @Input() public set sparkUsers(value: any) {
    if (value) {
      this._sparkUsers = value;
      this.groupId = this._sparkUsers[0].groupSparkRandomNumber;
    }
  }
  public get sparkUsers(): any {
    return this._sparkUsers;
  }

  @Output() public cancel: EventEmitter<boolean>;

  @ViewChild('scrollRef', { read: ElementRef, static: false }) public scrollRef: ElementRef;

  private _sparkUsers: any;
  private groupId: number;
  private pageNumber: number;
  private pageSize: number;

  constructor(
    private service: MyWallService,
    private globalResponseHandlerService: GlobalResponseHandlerService,
    private cdr: ChangeDetectorRef
  ) {
    this.cancel = new EventEmitter<boolean>();
    this.pageNumber = 1;
    this.pageSize = 10;
  }

  ngOnInit() {
  }

  /** Track by function use for maintain order */
  public trackByFn(index, item) {
    return index;
  }

  public onClickCancel(): void {
    this.cancel.emit(true);
  }

  public loadMoreList(): void {
    if (this.scrollRef.nativeElement.offsetHeight + this.scrollRef.nativeElement.scrollTop >= this.scrollRef.nativeElement.scrollHeight) {
      if (this._sparkUsers.length < this.sparkCount) {
        this.pageNumber++;
        this.service.getUserSubSparks(this.groupId, this.pageNumber, this.pageSize).subscribe((response) => {
          if (this.globalResponseHandlerService.getApiResponse(response, false, false)) {
            const sparkUsers = response.data;
            this.sparkUsers = [...this.sparkUsers, ...sparkUsers];
            this.cdr.detectChanges();
          }
        })
      }
    }
  }

}
