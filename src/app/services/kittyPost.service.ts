import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';
import { KittyPostLike } from '../models/KittyPostLike';

@Injectable({
  providedIn: 'root'
})
export class KittyPostService {
  public urlEndPoint:string = environment.host + '/kittypost'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

constructor(private http: HttpClient) { }

  getKittyPost(id: number): Observable<KittyPost> {
    return this.http.get<KittyPost>(`${this.urlEndPoint}/${id}`);
  }

  create(kittyPost: KittyPost) : Observable<KittyPost>{
    return this.http.post<KittyPost>(this.urlEndPoint, kittyPost, {headers: this.httpHeaders});
  }

  putPicture(archivo: File, id:string): Observable<KittyPost> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    return this.http.post(`${this.urlEndPoint}/picture/${id}`, formData).pipe(
      map( (response: any) => response.kittyPost as KittyPost )
    )
  }

  deleteKittyPost(id: number) {
    this.http.delete(`${this.urlEndPoint}/${id}`);
  }

  find30random() : Observable<KittyPost[]> {
    return this.http.get<KittyPost[]>(`${this.urlEndPoint}/random`);
  }

  newkittyPostLike(prruwnerId: number, kittyPostId: number): Observable<KittyPostLike> {
    return this.http.get<KittyPostLike>(`${this.urlEndPoint}/setlike/${prruwnerId}/${kittyPostId}`)
  }

  deletePostLike(prruwnerId: number, kittyPostId: number): Observable<String> {
    return this.http.delete<String>(`${this.urlEndPoint}/deletelike/${prruwnerId}/${kittyPostId}`)
  }

}
