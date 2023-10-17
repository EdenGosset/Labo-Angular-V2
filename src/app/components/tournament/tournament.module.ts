import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import {SharedModule} from "../../shared/shared.module";
import {PrimeModule} from "../../shared/prime/prime.module";
import { DetailsComponent } from './details/details.component';
import { MatchResultComponent } from './match-result/match-result.component';
import {StyleClassModule} from "primeng/styleclass";



@NgModule({
  declarations: [
    TournamentComponent,
    IndexComponent,
    AddComponent,
    DetailsComponent,
    MatchResultComponent
  ],
    imports: [
        CommonModule,
        TournamentRoutingModule,
        SharedModule,
        PrimeModule,
        StyleClassModule

    ]
})
export class TournamentModule { }
