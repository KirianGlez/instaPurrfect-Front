import { Injectable } from '@angular/core';
import { Prruwner } from '../models/Prruwner';
import { Observable } from 'rxjs';
import { of,map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { KittyPost } from '../models/KittyPost';

@Injectable({
  providedIn: 'root'
})
export class PrruwnerService {
  private urlEndPoint:string = 'http://localhost:8080/prruwner'

  constructor(private http: HttpClient) { }

  getPrruwner(id: number): Observable<Prruwner> {
    return this.http.get<Prruwner>(`${this.urlEndPoint}/${id}`);
  }

  getPrruwnerKittyPosts(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittypost/${id}`);
  }

}
