import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyWallEmoji, SparkRecations } from '../../../../../my-wall/my-wall.model';

@Component({
  selector: 'trigger-like-ui',
  templateUrl: './like.presentation.html',
  styleUrls: ['./like.presentation.scss']
})
export class LikePresentation implements OnInit {
  
  @Output() cancel = new EventEmitter<boolean>();
  
  public sparkRecations: SparkRecations[];
  public listOfEmoji: MyWallEmoji[];
  public displayList: SparkRecations[];
  
  public allEmoji: boolean;
  public allCount: number;
  public currentSelectedEmojiId: number;
  
  constructor() { }

  ngOnInit() {
    this.allCount = this.sparkRecations.length;
    this.displayList = this.sparkRecations;
    this.allEmoji = true;
    this.currentSelectedEmojiId = 0;
  }

  public onClickCount(id: number): void {
    this.allEmoji = id === 0 ? true : false;
    this.listOfEmoji.find(e => {
      e.active = (e.id === id ? true : false);
    });
    this.currentSelectedEmojiId = id;
    this.displayList = this.currentSelectedEmojiId === 0 ? this.sparkRecations :
      this.sparkRecations.filter(e => e.reactType === this.currentSelectedEmojiId);
  }

  public getEmoji(id: number): string {
    return this.listOfEmoji.find(e => e.id === id).image;
  }

  public onClickCancel(): void {
    this.cancel.emit(true);
  }
}
