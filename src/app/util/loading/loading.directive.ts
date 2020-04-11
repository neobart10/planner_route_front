import {Directive, ComponentFactoryResolver, ComponentRef, OnInit} from '@angular/core';

import {ViewContainerRef} from '@angular/core';
import {LoadingMessage, LoadingService} from './loading.service';
import {LoadingComponent} from './loading.component';


@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit {
  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: LoadingService
  ) {}

  ngOnInit() {
    this.service.observable.subscribe(
      message => this.createDialog(LoadingComponent, message)
    );
  }

  createDialog(dialogComponent: { new(): LoadingComponent }, message: LoadingMessage): ComponentRef<LoadingComponent> {
    this.viewContainer.clear();

    const dialogComponentFactory = this.componentFactoryResolver.resolveComponentFactory(dialogComponent);
    const dialogComponentRef = this.viewContainer.createComponent(dialogComponentFactory);

    dialogComponentRef.instance.show(message);

    if (!dialogComponentRef.instance.message.isShow) {
      dialogComponentRef.destroy();
    }

    return dialogComponentRef;
  }
}
