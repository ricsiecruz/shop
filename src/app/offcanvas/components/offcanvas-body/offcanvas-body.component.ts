import { Component, Input } from '@angular/core';

@Component({
  selector: 'bs-offcanvas-body',
  templateUrl: './offcanvas-body.component.html',
  styleUrls: ['./offcanvas-body.component.scss'],
})
export class OffcanvasBodyComponent {
  @Input() noPadding = false;
}
