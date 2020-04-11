import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import {LoadingService} from './loading.service';
import {LoadingDirective} from './loading.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingComponent, LoadingDirective],
  exports: [LoadingComponent, LoadingDirective],
  providers: [LoadingService]
})
export class LoadingModule { }
