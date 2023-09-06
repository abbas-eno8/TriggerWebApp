/**
@author : Anjali Tandel
@class : ColumnSorterPesentation
@description : ColumnSorterPesentation created for custom column configuration (checked/unchecked & drag-and-drop).
**/
import { Component, OnInit, Input } from '@angular/core';
import { MemberPresenter } from '../member-presenter/member.presenter';
import { TeamMemberColumns } from '../../../team-member-model';

@Component({
  selector: 'trigger-column-sorter-ui, button[trigger-column-sorter-ui]',
  templateUrl: './column-sorter.pesentation.html',
  styleUrls: ['./column-sorter.pesentation.scss']
})
export class ColumnSorterPesentation implements OnInit {
  
  /** This Input-property is used for map configurable columns */
  @Input() columns: TeamMemberColumns[];
  
  constructor(public memberPresenter: MemberPresenter) { }

  ngOnInit() { }

  /**
   * Author : Anjali Tandel
   * Created-Date : 11-03-2020
   * Description : Created method for perform action on click checkbox & emit event.
   */
  public onClickCheckBox(column: string): void {
    const colFound = this.columns.find(col => col.property === column);
    colFound.hidden = !colFound.hidden;
    this.memberPresenter.bindColumns(this.columns.filter(f => f.property));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 11-03-2020
   * Description : Created method drop event & emit event.
   */
  public onDrop($event: any): void {
    this.memberPresenter.bindColumns(this.columns.filter(f => f.property));
  }

  /**
   * Author : Anjali Tandel
   * Created-Date : 11-03-2020
   * Description : Created method for select/deselect all checkbox & emit event.
   */
  public onCheckAll(isSelected: boolean): void {
    this.columns.forEach(f => f.hidden = isSelected);
    this.memberPresenter.bindColumns(this.columns.filter(f => f.property));
  }
}
