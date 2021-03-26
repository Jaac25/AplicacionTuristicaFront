import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LugaresRoutingModule } from './lugares-routing.module';
import { LugaresComponent } from './lugares.component';

@NgModule({
  declarations: [LugaresComponent],
  imports: [
    CommonModule,
    LugaresRoutingModule,
    FormsModule
  ]
})
export class LugaresModule { }
