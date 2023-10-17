import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {PrimeModule} from "./prime/prime.module";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})

export class SharedModule {
}
