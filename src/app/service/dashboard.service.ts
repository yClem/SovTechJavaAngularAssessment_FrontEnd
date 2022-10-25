import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient,
    private apolloClient: Apollo) { }

  /**
   * REST
   */

  findPersons(page: number, size: number) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    return this.httpClient
      .get<any>(
        `${environment.restUrl}/persons`, {
        params: params,
      }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  findPersonByName(name: string, page: number, size: number) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    return this.httpClient
      .get<any>(
        `${environment.restUrl}/person/name/${name}`, {
        params: params,
      }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  findPersonById(id: number, page: number, size: number) {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    return this.httpClient
      .get<any>(
        `${environment.restUrl}/person/id/${id}`, {
        params: params,
      }
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }


  /**
    * GraphQL
    */

  executeQuery(query: any) {
    return this.apolloClient
      .query<any>({
        query: query
      }).pipe(
        map((response) => {
          return response
        })
      );
  }

}
