import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ComponentRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  Subject,
  takeUntil,
} from 'rxjs';
import { BsOffcanvasPosition } from '../../types/offcanvas-position';
import { BsOffcanvasComponent } from '../offcanvas/offcanvas.component';
import { OFFCANVAS_CONTENT } from '../providers/offcanvas-content.provider';
import { PORTAL_FACTORY } from '../providers/portal-factory.provider';

@Component({
  selector: 'bs-offcanvas',
  templateUrl: './offcanvas-host.component.html',
  styleUrls: ['./offcanvas-host.component.scss'],
})
export class BsOffcanvasHostComponent implements AfterViewInit, OnDestroy {
  constructor(
    private overlayService: Overlay,
    private rootInjector: Injector,
    @Inject(PORTAL_FACTORY)
    private portalFactory: (injector: Injector) => ComponentPortal<any>
  ) {
    this.state$.pipe(takeUntil(this.destroyed$)).subscribe((state) => {
      if (this.component) {
        this.stateChange.emit(state);
        this.component.instance.show$.next(state);
      }
    });

    combineLatest([this.position$, this.viewInited$])
      .pipe(filter(([position, viewInited]) => viewInited))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([position, viewInited]) => {
        if (this.component) {
          this.component.instance.position$.next(position);
        }
      });

    combineLatest([this.size$, this.viewInited$])
      .pipe(filter(([size, viewInited]) => viewInited))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([size, viewInited]) => {
        if (this.component) {
          this.component.instance.size$.next(size);
        }
      });

    combineLatest([this.hasBackdrop$, this.viewInited$])
      .pipe(filter(([hasBackdrop, viewInited]) => viewInited))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([hasBackdrop, viewInited]) => {
        if (this.component) {
          this.component.instance.hasBackdrop$.next(hasBackdrop);
        }
      });
  }

  content!: TemplateRef<any>;
  component!: ComponentRef<BsOffcanvasComponent>;
  viewInited$ = new BehaviorSubject<boolean>(false);
  state$ = new BehaviorSubject<boolean>(false);
  size$ = new BehaviorSubject<number | null>(null);
  position$ = new BehaviorSubject<BsOffcanvasPosition>('bottom');
  hasBackdrop$ = new BehaviorSubject<boolean>(false);
  destroyed$ = new Subject();

  @Output() backdropClick = new EventEmitter<MouseEvent>();

  ngAfterViewInit() {
    const injector = Injector.create({
      providers: [{ provide: OFFCANVAS_CONTENT, useValue: this.content }],
      parent: this.rootInjector,
    });
    // const portal = new ComponentPortal(BsOffcanvasComponent, null, injector);
    const portal = this.portalFactory(injector);
    const overlayRef = this.overlayService.create({
      scrollStrategy: this.overlayService.scrollStrategies.block(),
      positionStrategy: this.overlayService
        .position()
        .global()
        .top('0')
        .left('0')
        .bottom('0')
        .right('0'),
      hasBackdrop: false,
    });

    this.component = overlayRef.attach<BsOffcanvasComponent>(portal);

    this.component.instance.backdropClick
      .pipe(takeUntil(this.destroyed$))
      .subscribe((ev) => {
        this.backdropClick.emit(ev);
      });

    this.viewInited$.next(true);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

  //#region State
  @Output() public stateChange = new EventEmitter<boolean>();
  @Input() public set state(value: boolean) {
    this.state$.next(value);
  }
  public get state() {
    return this.state$.value;
  }
  //#endregion

  //#region Position
  @Input() public set position(value: BsOffcanvasPosition) {
    this.position$.next(value);
  }
  public get position() {
    return this.position$.value;
  }
  //#endregion

  //#region Size
  @Input() public set size(value: number | null) {
    this.size$.next(value);
  }
  public get size() {
    return this.size$.value;
  }
  //#endregion

  //#region HasBackdrop
  @Input() public set hasBackdrop(value: boolean) {
    this.hasBackdrop$.next(value);
  }
  public get hasBackdrop() {
    return this.hasBackdrop$.value;
  }
  //#endregion
}
