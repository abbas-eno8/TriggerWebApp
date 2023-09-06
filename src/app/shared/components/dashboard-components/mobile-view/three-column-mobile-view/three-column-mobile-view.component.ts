import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[trigger-three-column-mobile-view].w-100',
  templateUrl: './three-column-mobile-view.component.html',
  styleUrls: ['./three-column-mobile-view.component.scss']
})
export class ThreeColumnMobileViewComponent implements OnInit {
  @Input() lastScoreRank: string;
  @Input() lastScoreRankClass: string;
  @Input() lastAssessedDate: string;
  @Input() currentYrAvgScoreRank: string;
  @Input() currentYrAvgScoreRankClass: string;
  @Input() actualRating: string;
  @Input() lastYearActualRating: any;
  @Input() lyrAvgScoreRank: string;
  @Input() lyrAvgScoreRankClass: string;

  constructor() { }

  ngOnInit() {
  }

}
