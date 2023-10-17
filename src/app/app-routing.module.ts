import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {TournamentComponent} from "./components/tournament/tournament.component";
import {MemberComponent} from "./components/member/member.component";
import {LoginComponent} from "./components/login/login.component";
import {roleGuardGuard} from "./guards/role-guard.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {
    path: 'tournament',
    component: TournamentComponent,
    loadChildren: () => import("./components/tournament/tournament.module").then((t) => t.TournamentModule)
  },

  {path: 'member', component: MemberComponent, canActivate: [roleGuardGuard]},

  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
