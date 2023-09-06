import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TooltipHover } from '../../../../../my-wall/my-wall.model';
import { MyWallPresenter } from '../../my-wall-presenter/my-wall.presenter';

@Component({
  selector: 'trigger-tooltip-ui',
  templateUrl: './reaction-tooltip.html',
  styleUrls: ['./reaction-tooltip.scss']
})
export class ReactionTooltip implements OnInit {
  @Input() reactions: TooltipHover[];
  @Input() sparkId: number;
  @Input() commentId: number;
  @Input() tooltipClass: string;

  @Input() sparkGroupId: any;
  @Input() public set userSpark(value: any) {
    if (value) {
      this._userSpark = value;
    }
  }
  public get userSpark(): any {
    return this._userSpark;
  }

  @Input() public set hoverReaction(value: number) {
    if (value) {
      this._hoverReaction = value;
      this.reactionShow = 5;
    }
  }
  public get hoverReaction(): number {
    return this._hoverReaction;
  }

  @Output() openReactionPopup: EventEmitter<[number, number, number]> = new EventEmitter();
  @Output() addReactionType: EventEmitter<[number, number, number, number]> = new EventEmitter();

  public reactionShow: number;

  private _hoverReaction: number;
  private _userSpark: any;
  private _sparkGroupId: number;

  constructor(
    public myWallPresenter: MyWallPresenter
  ) {
    this.reactionShow = 5;
  }

  ngOnInit() {
  }

  public getEmoji(id: number): string {
    return this.myWallPresenter.getEmoji(id);
  }

  public onClickCount(sparkId: number, commentId: number): void {
    this.openReactionPopup.emit([sparkId, this.commentId, this.sparkGroupId]);
  }

  public onClickReaction(sparkGroupId, sparkId: number, commentId: number, reactType: number): void {
    this.addReactionType.emit([+sparkGroupId, sparkId, commentId, reactType]);
  }

  public showAllReaction(): void {
    this.reactionShow = this.reactions.length;
  }
}
