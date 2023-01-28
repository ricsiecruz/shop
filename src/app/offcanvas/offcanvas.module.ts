import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsOffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { BsOffcanvasContentDirective } from './directives/offcanvas-content/offcanvas-content.directive';
import { BsOffcanvasHostComponent } from './components/offcanvas-host/offcanvas-host.component';
import { BsOffcanvasCloseDirective } from './directives/offcanvas-close/offcanvas-close.directive';
import { OffcanvasHeaderComponent } from './components/offcanvas-header/offcanvas-header.component';
import { OffcanvasBodyComponent } from './components/offcanvas-body/offcanvas-body.component';
import { PORTAL_FACTORY } from './components/providers/portal-factory.provider';
import { ComponentPortal } from '@angular/cdk/portal';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BsOffcanvasComponent,
    BsOffcanvasContentDirective,
    BsOffcanvasHostComponent,
    BsOffcanvasCloseDirective,
    OffcanvasHeaderComponent,
    OffcanvasBodyComponent,
  ],
  exports: [
    BsOffcanvasComponent,
    BsOffcanvasContentDirective,
    BsOffcanvasHostComponent,
    BsOffcanvasCloseDirective,
    OffcanvasHeaderComponent,
    OffcanvasBodyComponent,
  ],
  // We need this to make our unit tests working
  providers: [
    {
      provide: PORTAL_FACTORY,
      useValue: (injector: Injector) => {
        return new ComponentPortal(BsOffcanvasComponent, null, injector);
      },
    },
  ],
})
export class BsOffcanvasModule {}
