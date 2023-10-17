import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TournamentService} from "../../../services/tournament.service";
import {TournamentCategory} from "../../../shared/enums/tournamentCategory";
import {catchError, EMPTY, tap} from "rxjs";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{

  tournamentForm!: FormGroup;
  categories = Object.values(TournamentCategory);
  isError: boolean = false;



  constructor(private _formBuilder: FormBuilder,
              private _route: Router,
              private _addTournamentService: TournamentService) {

    this.tournamentForm = this._formBuilder.group({
      name: ['', Validators.required],
      location: [''],
      minPlayers: [null, Validators.required],
      maxPlayers: [null, Validators.required],
      eloMin: [null],
      eloMax: [null],
      categories: [[], Validators.required],
      womenOnly: [false],
      endOfRegistrationDate: [null, Validators.required],
    })
  }

  ngOnInit(){

  }

  addTournament():void {
    if(this.tournamentForm.valid){
      const formData = this.tournamentForm.value;

      console.log(formData)
      this._addTournamentService.addTournament(formData).pipe(
        tap( () => this._route.navigateByUrl("/tournament/index")),
        catchError( () => {
          this.toggleError()
          return EMPTY
        } )
      ).subscribe(
          (response) => {
        console.log("Tournoi ajouté : ", response)
      },
          (error) => {
            console.error("Il y a une erreur")
          }

          )
    }
  }

  toggleError(){
    this.isError = !this.isError
  }


}
