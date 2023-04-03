import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KittyPost } from '../models/KittyPost';

@Injectable({
  providedIn: 'root'
})
export class PurrfeedService {
  private urlEndPoint:string = 'http://localhost:8080/purrfeed'

constructor(private http: HttpClient) { }
  getPrruwnerKittyPostsByPurryFriends(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittypost/${id}`)
  }
}
