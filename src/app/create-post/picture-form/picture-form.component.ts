import { KittyPost } from './../../models/KittyPost';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Kitty } from 'src/app/models/Kitty';
import { Prruwner } from 'src/app/models/Prruwner';
import { KittyService } from 'src/app/services/kitty.service';
import { KittyPostService } from 'src/app/services/kittyPost.service';
import { PrruwnerService } from 'src/app/services/prruwner.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ImagesService } from 'src/app/services/images.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.css']
})
export class PictureFormComponent implements OnInit{
  kittyId: number;
  prruwner: Prruwner;
  kitty: Kitty;
  host: string;
  private fotoSeleccionada: File;
  imageSrc: string;
  kittyPost: KittyPost = new KittyPost();

  constructor(private imagesService:ImagesService,private kittyPostService:KittyPostService,private prruwnerService:PrruwnerService, private kittyService:KittyService, public auth: AuthService, private router: Router, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.host = environment.host;
    this.kittyId = this.route.snapshot.params['id'];
    this.kittyService.getKitty(this.kittyId).subscribe(
      (kitty) => {
        this.kitty = kitty;
      }
    )
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

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  subirFoto() {
    this.imagesService.uploadImage(this.fotoSeleccionada, this.fotoSeleccionada.name, () => {
      this.kittyPost.pawscture = this.imagesService.url + this.fotoSeleccionada.name;
    })

    /*this.kittyPostService.putPicture(this.fotoSeleccionada, this.kittyPost.kittyPostId.toString()).subscribe(
      kittyPost => {
        this.kittyPost = kittyPost;
        this.router.navigate(['/prruwner']);
      },
      error => {
        Swal.fire('Error', 'No se pudo subir la foto', 'error')
        this.router.navigate([`/feed`])
      }
    )*/
  }

  create(){
    this.kittyPost.kitty = this.kitty;
    this.kittyPost.prruwner = this.prruwner;
    this.kittyPost.pawscture = this.imagesService.url + this.fotoSeleccionada.name;
    this.kittyPostService.create(this.kittyPost).subscribe(kittyPost => {
      this.kittyPost = kittyPost
      Swal.fire('Nuevo Post', `Has publicado un nuevo kittyPost, gracias!`, 'success')
      this.subirFoto();
    })
  }

}