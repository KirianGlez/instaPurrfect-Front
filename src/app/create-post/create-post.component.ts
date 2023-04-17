import { KittyPost } from './../models/KittyPost';
import { PrruwnerService } from './../services/prruwner.service';
import { Component, Input, OnInit } from '@angular/core';
import { Prruwner } from '../models/Prruwner';
import { AuthService } from '@auth0/auth0-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit{
  prruwner: Prruwner = new Prruwner();
  host: string;

  constructor(private prruwnerService:PrruwnerService, public auth: AuthService, private router: Router, private route: ActivatedRoute) {

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
