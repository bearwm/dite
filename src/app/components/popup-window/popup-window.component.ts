import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.scss']
})
export class PopupWindowComponent implements OnInit {
  @Input() public open;
  @Output() public closed = new EventEmitter<void>();

  ngOnInit() {
    this.open = true;
  }

  public close() {
    this.open = false;
    this.closed.emit();
  }
}
