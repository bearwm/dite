import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-debug-user',
  templateUrl: './debug-user.component.html',
  styleUrls: ['./debug-user.component.scss']
})
export class DebugUserComponent {
  @Input() public list: boolean[];
  @Output() public closed = new EventEmitter<void>();

  public close() {
    this.closed.emit();
  }
}
