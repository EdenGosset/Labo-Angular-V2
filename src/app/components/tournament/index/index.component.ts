import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../../services/tournament.service";
import {Tournament} from "../../../shared/models/tournament";
import {Observable, tap} from "rxjs";
import {TournamentIndex} from "../../../shared/models/tournamentIndex";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {TournamentCategory} from "../../../shared/enums/tournamentCategory";
import {TournamentStatus} from "../../../shared/enums/tournamentStatus";
import {AuthenticationService} from "../../../services/authentication.service";
import {Token} from "../../../shared/models/token";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  tournamentSub!: Observable<TournamentIndex>
  tournaments: Tournament[] | undefined = [];
  tourna!: Tournament[];
  searchForm: FormGroup;
  tournamentCategories = Object.values(TournamentCategory); // Options pour p-multiSelect
  tournamentStatus = Object.values(TournamentStatus)
  token: Token | undefined;


  constructor(private _tournamentService: TournamentService,
              private _formBuilder: FormBuilder,
              private _route: Router,
              public user: AuthenticationService) {

    this.searchForm = this._formBuilder.group({
      name: [''],
      category: [null],
      status: [null],
      womenOnly: [false],
      eloMin: [null],
      eloMax: [null],
      endOfRegistrationDate: [null]
    })


  }

  ngOnInit() {

    this.user.authToken$.subscribe(data => this.token = data)

    this.getTournois();

    this._tournamentService.getTourna({
      name: undefined,
      category: undefined,
      status: [TournamentStatus.C, TournamentStatus.I, TournamentStatus.W],
      womenOnly: false
    }).subscribe(
      data => {
        this.tournaments = data.results;
      },
      error => {
        console.error('Error fetching tournaments:', error);
      }
    );

    this.getTournaments()

  }

  getTournaments(): void {

    this.tournamentSub = this._tournamentService.getTournaments().pipe(
      tap(data => this.tournaments = data.results)
    )
  }

  getTournois(): void {
    const formValue = this.searchForm.value;

    this._tournamentService.getTourna({
      name: formValue.name,
      category: formValue.category,
      status: formValue.status,
      womenOnly: formValue.womenOnly
    }).subscribe(
      data => {
        this.tournaments = data.results;
      },
      error => {
        console.error('Error fetching tournaments:', error);
      }
    );
  }

  deleteTournois(id: string): void {
    this._tournamentService.deleteTournament(id).subscribe(
      () => {
        window.location.reload();
        console.log("Tournoi supprimé avec succès !");
        // Ajoutez ici la logique pour afficher un message de succès ou recharger la liste des tournois.
      },
      (error) => {
        console.error("Une erreur s'est produite lors de la suppression du tournoi :", error);
        // Ajoutez ici la logique pour afficher un message d'erreur si nécessaire.
      }
    );
  }

  tournamentInscription(tournamentId: string) {
    this._tournamentService.tournamentInscription(tournamentId, this.user.user?.username).subscribe(
      () => {
        this.getTournois()
        console.log("Inscription au tournoi réussie !");

      },
      (error) => {
        console.log(tournamentId)
        console.error("Une erreur s'est produite lors de l'inscription au tournoi :", error);

      }
    );
  }

  tournamentUnsub(tournamentId: string) {
    this._tournamentService.tournamentDesinscription(tournamentId).subscribe(
      () => {
        this.getTournois()
        console.log("Désinscription du tournoi réussie !");

      },
      (error) => {
        console.error("Une erreur s'est produite lors de la désinscription au tournoi :", error);
        // Ajoutez ici la logique pour afficher un message d'erreur si nécessaire.
      }
    );
  }


  protected readonly status = status;
}
