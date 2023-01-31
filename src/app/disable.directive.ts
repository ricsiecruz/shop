import { Directive, Input, Optional, ViewContainerRef, ViewChildren, QueryList, AfterViewInit, Host, ContentChildren } from '@angular/core'
import { NgControl, FormGroup } from '@angular/forms'

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    if (this.ngControl) {
      if (condition)
        this.ngControl.control?.disable();
      else
        this.ngControl.control?.enable();
    }
    if (this.controls) {
      this.controls.forEach((x: any) => {
        let control:boolean=false;
        if (this.innerControl)
          control=(this.innerControl.find(inner=>x==inner.ngControl)!=null)

        if (!control) {
          if (condition)
            x.control.disable();
          else
            x.control.enable()
        }
      })

    }
  }
  @ContentChildren(NgControl) controls?: QueryList<NgControl>
  @ContentChildren(DisableControlDirective) innerControl?:QueryList<DisableControlDirective>
  constructor(@Optional() public ngControl: NgControl) {
  }
}