import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnSorterPesentation } from './column-sorter.pesentation';

describe('ColumnSorterPesentationComponent', () => {
  let component: ColumnSorterPesentation;
  let fixture: ComponentFixture<ColumnSorterPesentation>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnSorterPesentation ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnSorterPesentation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
