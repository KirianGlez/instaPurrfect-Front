import { Kitty } from './../models/Kitty';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KittyService {
  public urlEndPoint:string = environment.host + '/kitty'

constructor(private http: HttpClient) { }

  getKitty(id: number): Observable<Kitty> {
    return this.http.get<Kitty>(`${this.urlEndPoint}/${id}`);
  }

  getKittyKittyPosts(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittyposts/${id}`);
  }

}
