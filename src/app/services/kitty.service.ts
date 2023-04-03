import { Kitty } from './../models/Kitty';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KittyPost } from '../models/KittyPost';

@Injectable({
  providedIn: 'root'
})
export class KittyService {
  private urlEndPoint:string = 'http://localhost:8080/kitty'

constructor(private http: HttpClient) { }

  getKitty(id: number): Observable<Kitty> {
    return this.http.get<Kitty>(`${this.urlEndPoint}/${id}`);
  }

  getKittyKittyPosts(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittyposts/${id}`);
  }

}
