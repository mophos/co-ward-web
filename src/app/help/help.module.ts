import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { DateThPipe } from './dateTh.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaddingComponent } from './loadding/loadding.component';

@NgModule({
  declarations: [
    DateThPipe,
    LoaddingComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule
  ],
  exports: [
    DateThPipe,
    LoaddingComponent
  ]
})
export class HelpModule { }
