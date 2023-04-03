import { Component } from '@angular/core';
import { KittyPost } from '../models/KittyPost';
import { Prruwner } from '../models/Prruwner';
import { PrruwnerService } from '../services/prruwner.service';
import { CookieService } from 'ngx-cookie-service';
import { PurrfeedService } from '../services/purrfeed.service';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent {
  prruwner: Prruwner = new Prruwner();
  kittyPosts: KittyPost[] = [];

  constructor(private prruwnerService:PrruwnerService,private purrfeedService:PurrfeedService, private CookieService: CookieService){
    this.CookieService.set('user', '1');
  }

  ngOnInit() {
    this.prruwnerService.getPrruwner(Number(this.CookieService.get('user'))).subscribe(
      prruwner => this.prruwner = prruwner
    )
    this.purrfeedService.getPrruwnerKittyPostsByPurryFriends(Number(this.CookieService.get('user'))).subscribe(
      kittyPost => {this.kittyPosts = kittyPost;console.log(this.kittyPosts)}
    )
  }
}
