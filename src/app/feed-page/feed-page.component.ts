import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Component } from '@angular/core';
import { KittyPost } from '../models/KittyPost';
import { Prruwner } from '../models/Prruwner';
import { PrruwnerService } from '../services/prruwner.service';
import { PurrfeedService } from '../services/purrfeed.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed-page',
  templateUrl: './feed-page.component.html',
  styleUrls: ['./feed-page.component.css']
})
export class FeedPageComponent {
  prruwner: Prruwner = new Prruwner();
  kittyPosts: KittyPost[] = [];
  host: string;

  constructor(private prruwnerService:PrruwnerService,private purrfeedService:PurrfeedService, public auth: AuthService, public router: Router){

  }

  ngOnInit() {
    this.host = environment.host;
    this.auth.isAuthenticated$.subscribe( auth => {
      if(!auth){
        this.auth.loginWithRedirect();
      }else{
        this.auth.user$.subscribe( user => {
          this.prruwnerService.getPrruwnerByOauthId(user?.sub!).subscribe(
            (prruwner) => {
              this.prruwner = prruwner;
              this.purrfeedService.getPrruwnerKittyPostsByPurryFriends(prruwner.prruwnerId).subscribe(
                kittyPost => {this.kittyPosts = kittyPost;}
              )
            },
            (error) => {
              this.router.navigate([`/login`]);
            }
          )
        })

      }
    })
  }

}
