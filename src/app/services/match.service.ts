import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../shared/models/match";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  url: string = "https://khun.somee.com/api";
  constructor(private _httpClient: HttpClient) { }

  getMatch( params: {
    tournamentId: string,
    round? : number
  }): Observable<Match[]> {

    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set("tournamentId", params.tournamentId)

    if(params.round){
      httpParams = httpParams.set("round", params.round)
    }

    return this._httpClient.get<Match[]>(`${this.url}/Match`, {params:httpParams})

  }

  resultMatch(matchId: number, matchResult: string){
    console.log(matchId)
    console.log(matchResult)

    const body = { result: matchResult};
    const headers = {
      'Content-Type' : 'application/json'
    }

    return this._httpClient.patch(`${this.url}/Match/${matchId}/result`, body, {headers})
  }

}
