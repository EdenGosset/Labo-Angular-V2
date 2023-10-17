import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {AddComponent} from "./add/add.component";
import {DetailsComponent} from "./details/details.component";

const routes: Routes = [
  {path: "index", component : IndexComponent},
  {path: "add", component: AddComponent},
  {path: "details/:id", component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
