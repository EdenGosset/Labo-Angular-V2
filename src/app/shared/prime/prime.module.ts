import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputSwitchModule} from "primeng/inputswitch";
import {MultiSelectModule} from "primeng/multiselect";
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {SpinnerModule} from "primeng/spinner";
import {StepsModule} from "primeng/steps";
import {PanelModule} from "primeng/panel";
import {TableModule} from "primeng/table";
import {MenuModule} from "primeng/menu";
import {SlideMenuModule} from "primeng/slidemenu";






@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    MultiSelectModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    SpinnerModule,
    StepsModule,
      PanelModule,
      TableModule,
    MenuModule,
    SlideMenuModule

  ]

})
export class PrimeModule { }
