import { Kitty } from './../models/Kitty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KittyService {
  public urlEndPoint:string = environment.host + '/kitty'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

constructor(private http: HttpClient) { }

  getKitty(id: number): Observable<Kitty> {
    return this.http.get<Kitty>(`${this.urlEndPoint}/${id}`);
  }

  getKittyKittyPosts(id: number): Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/kittyposts/${id}`);
  }

  create(kitty: Kitty) : Observable<Kitty>{
    return this.http.post<Kitty>(this.urlEndPoint, kitty, {headers: this.httpHeaders});
  }

  putPicture(archivo: File, id: string): Observable<Kitty> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    return this.http.post(`${this.urlEndPoint}/picture`, formData).pipe(
      map( (response: any) => response.kitty as Kitty )
    )
  }

  deleteKitty(id: number) {
    this.http.delete(`${this.urlEndPoint}/${id}`);
  }

}
