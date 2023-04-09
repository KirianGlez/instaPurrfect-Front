import { KittyPost } from './../models/KittyPost';
import { PrruwnerService } from './../services/prruwner.service';
import { Component, Input, OnInit } from '@angular/core';
import { Prruwner } from '../models/Prruwner';
import { AuthService } from '@auth0/auth0-angular';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prruwner-page',
  templateUrl: './prruwner-page.component.html',
  styleUrls: ['./prruwner-page.component.css']
})
export class PrruwnerPageComponent implements OnInit{
  @Input() kittyId: number | null;
  prruwner: Prruwner = new Prruwner();
  kittyPosts: KittyPost[] = [];
  editar: boolean = false;
  private fotoSeleccionada: File;
  host: string;

  constructor(private prruwnerService:PrruwnerService, public auth: AuthService, private router: Router, private route: ActivatedRoute){
  }

  ngOnInit() {
    this.host = environment.host;
    if(this.route.snapshot.params['editar'] != undefined){
      this.editar = this.route.snapshot.params['editar'];
    }
    if(!this.kittyId){
      this.auth.isAuthenticated$.subscribe( auth => {
        if(!auth){
          this.auth.loginWithRedirect();
        }else{
          this.auth.user$.subscribe( user => {
            this.prruwnerService.getPrruwnerByOauthId(user?.sub!).subscribe(
              (prruwner) => {
                this.prruwner = prruwner;
                this.prruwnerService.getPrruwnerKittyPosts(prruwner.prruwnerId).subscribe(
                  kittyPost => {console.log(prruwner.prruwnerId);this.kittyPosts = kittyPost;}
                )
              },
              (error) => {
                this.router.navigate([`/login`]);
              }
            )
          })

        }
      })
    } else {
      this.prruwnerService.getPrruwner(this.kittyId).subscribe(
        prruwner => this.prruwner = prruwner
      )
      this.prruwnerService.getPrruwnerKittyPosts(this.kittyId).subscribe(
        kittyPost => {this.kittyPosts = kittyPost;console.log(this.kittyPosts)}
      )
    }
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
  }

  subirFoto() {
    this.prruwnerService.putPicture(this.fotoSeleccionada, this.prruwner.prruwnerOauthId).subscribe(
      prruwner => {
        this.prruwner = prruwner;
        Swal.fire('La foto se ha cambiado correctamente!' , 'La foto se ha cambiado correctamente!', 'success')
      }
    )
  }

}
