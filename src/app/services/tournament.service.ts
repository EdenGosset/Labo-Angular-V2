import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TournamentIndex} from "../shared/models/tournamentIndex";
import {TournamentAdd} from "../shared/models/tournamentAdd";
import {TournamentDetails} from "../shared/models/tournamentDetails";
import {Match} from "../shared/models/match";
import {User} from "../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private readonly BASE_URL: string ="https://khun.somee.com/api/Tournament?Statuses=WaitingForPlayers&Statuses=InProgress&Statuses=Closed"
  private readonly URL: string="https://khun.somee.com/api"
  constructor(private _httpclient: HttpClient) {  }

  getTournaments(): Observable<TournamentIndex>{
    return this._httpclient.get<TournamentIndex>(this.BASE_URL)
  }

  addTournament(newTournament: TournamentAdd): Observable<TournamentAdd> {
    return this._httpclient.post<TournamentAdd>(`${this.URL}/Tournament`, newTournament )
  }

  getTourna(params: {
    offset?: number;
    name?: string;
    category?: string[];
    status?: string[];
    womenOnly?: boolean;
  }): Observable<TournamentIndex> {
    let httpParams = new HttpParams();

    if (params.offset) {
      httpParams = httpParams.set('Offset', params.offset.toString());
    }
    if (params.name) {
      httpParams = httpParams.set('Name', params.name);
    }
    if (params.category) {
      for(const categories of params.category){
        httpParams = httpParams.append('Category', categories);
      }
    }
    if (params.status) {
      for (const status of params.status) {
        httpParams = httpParams.append('Statuses', status);
      }
    }
    if (params.womenOnly) {
      httpParams = httpParams.set('WomenOnly', params.womenOnly.toString());
    }

    return this._httpclient.get<TournamentIndex>(`${this.URL}/Tournament`, { params: httpParams });
  }

  getOneTournament(id: string): Observable<TournamentDetails> {
    return this._httpclient.get<TournamentDetails>(`${this.URL}/Tournament/${id}`)
  }

  deleteTournament(id: string) {
    return this._httpclient.delete(`${this.URL}/Tournament/${id}`);
  }

  getMatches(tournamentId: string | undefined, round: number) : Observable<Match[]> {
    return this._httpclient.get<Match[]>(`${this.URL}/Match?tournamentId=${tournamentId}&round=${round}`)
  }

  start(tournamentId: string) {
    return this._httpclient.patch(`${this.URL}/Tournament/${tournamentId}/start`, tournamentId)
  }

  nextRound(tournamentId: string) {
    return this._httpclient.patch(`${this.URL}/Tournament/${tournamentId}/nextRound`, tournamentId)
  }


  updateMatchResult(id: string, match: Match): Observable<void> {
    return this._httpclient.patch<void>(`${this.URL}/Match${id}`, match);
  }

  tournamentInscription(id: string | undefined, newInscription: string | undefined) : Observable<any> {
    return this._httpclient.post(`${this.URL}/TournamentInscription/${id}`, newInscription )
  }

  tournamentDesinscription(id: string | undefined): Observable<any> {
    return this._httpclient.delete(`${this.URL}/TournamentInscription/${id}`);
  }

}
