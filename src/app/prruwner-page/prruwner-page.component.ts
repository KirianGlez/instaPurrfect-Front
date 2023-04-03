import { KittyPost } from './../models/KittyPost';
import { PrruwnerService } from './../services/prruwner.service';
import { Component, Input, OnInit } from '@angular/core';
import { Prruwner } from '../models/Prruwner';
import { CookieService } from 'ngx-cookie-service';
import { Kitty } from '../models/Kitty';

@Component({
  selector: 'app-prruwner-page',
  templateUrl: './prruwner-page.component.html',
  styleUrls: ['./prruwner-page.component.css']
})
export class PrruwnerPageComponent implements OnInit{
  @Input() kittyId: number | null;
  prruwner: Prruwner = new Prruwner();
  kittyPosts: KittyPost[] = [];

  constructor(private prruwnerService:PrruwnerService, private CookieService: CookieService){
    this.CookieService.set('user', '1');

  }

  ngOnInit() {
    if(!this.kittyId){
      this.prruwnerService.getPrruwner(Number(this.CookieService.get('user'))).subscribe(
        prruwner => this.prruwner = prruwner
      )
      this.prruwnerService.getPrruwnerKittyPosts(Number(this.CookieService.get('user'))).subscribe(
        kittyPost => {this.kittyPosts = kittyPost;console.log(this.kittyPosts)}
      )
    } else {
      console.log(this.kittyId);
      this.prruwnerService.getPrruwner(this.kittyId).subscribe(
        prruwner => this.prruwner = prruwner
      )
      this.prruwnerService.getPrruwnerKittyPosts(this.kittyId).subscribe(
        kittyPost => {this.kittyPosts = kittyPost;console.log(this.kittyPosts)}
      )
    }

  }

}
