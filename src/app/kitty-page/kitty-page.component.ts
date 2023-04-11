import { KittyService } from './../services/kitty.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kitty } from '../models/Kitty';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';
import { PrruwnerService } from '../services/prruwner.service';
import { AuthService } from '@auth0/auth0-angular';
import { Prruwner } from '../models/Prruwner';

@Component({
  selector: 'app-kitty-page',
  templateUrl: './kitty-page.component.html',
  styleUrls: ['./kitty-page.component.css']
})
export class KittyPageComponent implements OnInit{

  kitty: Kitty;
  kittyPosts: KittyPost[];
  editar: boolean = false;
  host: string;
  kittyId: number;
  siguiendo: Boolean;
  prruwner: Prruwner;

  constructor(private kittyService:KittyService,private prruwnerService:PrruwnerService, public auth: AuthService, private router: Router, private route: ActivatedRoute) {}

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
              this.cargarKitty();
            },
            (error) => {
              this.cargarKitty();
            }
          )
        })

      }
    })

  }

  cargarKitty(){
    if(this.route.snapshot.paramMap.get('editar')){
      this.editar = true;
      this.kittyId = Number(this.route.snapshot.paramMap.get('id'))
    }else{
      this.kittyService.getKitty(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        kitty => {
          this.kitty = kitty;
          this.prruwnerService.checkIfFollow(this.prruwner.prruwnerId, this.kitty.kittyId).subscribe(
            siguiendo => this.siguiendo = siguiendo
          );
        }
      )

      this.kittyService.getKittyKittyPosts(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        kittyPosts => this.kittyPosts = kittyPosts
      )
    }
  }

  seguir(){
    this.prruwnerService.newPurryFriend(this.prruwner.prruwnerId, this.kitty.kittyId).subscribe(
      purryFriend => {this.siguiendo=true; console.log(purryFriend);}
    )
  }

  dejarDeSeguir(){
    this.prruwnerService.deletePurryFriend(this.prruwner.prruwnerId, this.kitty.kittyId).subscribe(
      recibido => console.log(recibido)
    )
    this.siguiendo=false;
  }

}
