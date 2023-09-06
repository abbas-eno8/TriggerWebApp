import { AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'trigger-signature',
  templateUrl: './signature.component.html'
})
export class SignatureComponent implements OnInit, AfterViewInit {

  @ViewChild('signaturePad', { static: false }) sigPad;

  /** Save SIgnature */
  @Output() public saveSignature: EventEmitter<any>;
  /** Cancel Signature */
  @Output() public cancelSignature: EventEmitter<any>;

  public signaturePreview;

  private sigPadElement;
  private context;
  private isDrawing = false;

  constructor() { 
    this.saveSignature = new EventEmitter<any>();
    this.cancelSignature = new EventEmitter<any>();
  }

  public ngOnInit() {
  }

  public ngAfterViewInit(): void {
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
    this.context.strokeStyle = '#3742fa';
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  public save() {
    this.signaturePreview = this.sigPadElement.toDataURL('image/png');
    this.saveSignature.emit(this.signaturePreview);
  }

  public clear() {
    this.context.clearRect(
      0,
      0,
      this.sigPadElement.width,
      this.sigPadElement.height
    );
    this.context.beginPath();
    this.cancelSignature.emit(true);
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

}
