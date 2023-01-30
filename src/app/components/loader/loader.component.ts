import { Component } from "@angular/core";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "loader",
  template: `
    <div *ngIf="show" class="loaderMask">
      
      
<div class="loader-wrapper">
  
<div class="backdrop"></div>

<div class="spinner"></div>

</div>
    </div>
  `,
  styles: [
    ".loaderMask{position: absolute; height: 100%; width: 100%; z-index: 1; background-color: rgba(100, 100, 100, 0.3);display: flex; align-items: center; justify-content: center; font-size: 24px;}.backdrop {position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(0, 0, 0, 0.568);}.loader-wrapper{position: fixed;top: calc(50% - 24px);left:calc(50% - 24px);}@keyframes rotating {100% {transform: rotate(360deg);}}.spinner {border-radius: 50%;width: 30px;height: 30px;border: 4px solid rgba(243, 243, 243, 0.1);border-top: 4px solid #fff;animation: rotating 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);}"
  ]
})
export class LoaderComponent {
  show!: boolean;
  constructor(private _loaderService: LoaderService) {}

  ngOnInit() {
    this._loaderService.loadState.subscribe(res => {
      this.show = res;
    });
  }
}
