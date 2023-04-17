import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurrfeedService {
  public urlEndPoint:string = environment.host + '/purrfeed'

constructor(private http: HttpClient) { }
  getPrruwnerKittyPostsByPurryFriends(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittypost/${id}`)
  }
}
