import { Injectable } from '@angular/core';
import { Prruwner } from '../models/Prruwner';
import { Observable, catchError, throwError } from 'rxjs';
import { of,map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrruwnerService {
  public urlEndPoint:string = environment.host + '/prruwner'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getPrruwner(id: number): Observable<Prruwner> {
    return this.http.get<Prruwner>(`${this.urlEndPoint}/${id}`);
  }

  getPrruwnerKittyPosts(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittypost/${id}`);
  }

  getPrruwnerByOauthId(oauthid: string): Observable<Prruwner> {
    return this.http.put<Prruwner>(`${this.urlEndPoint}/oauth`, oauthid, {headers: this.httpHeaders});
  }

  create(prruwner: Prruwner) : Observable<Prruwner>{
    return this.http.post<Prruwner>(this.urlEndPoint, prruwner, {headers: this.httpHeaders});
  }

  putPicture(archivo: File, oauthid: string): Observable<Prruwner> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", oauthid);

    return this.http.post(`${this.urlEndPoint}/picture`, formData).pipe(
      map( (response: any) => response.prruwner as Prruwner )
    )
  }

}
