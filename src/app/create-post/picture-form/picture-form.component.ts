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
  sas = "sp=racwdl&st=2023-04-17T11:33:24Z&se=2023-04-19T19:33:24Z&spr=https&sv=2021-12-02&sr=c&sig=8BoBFyF0WmaDXEsHNjayU5N2ZXGttYMy7xvjP9KGEJY%3D";

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

    this.imagesService.uploadImage(this.sas, this.fotoSeleccionada, this.fotoSeleccionada.name, () => {
      console.log("hola");
    })

    this.kittyPostService.putPicture(this.fotoSeleccionada, this.kittyPost.kittyPostId.toString()).subscribe(
      kittyPost => {
        this.kittyPost = kittyPost;
        this.router.navigate(['/prruwner']);
      },
      error => {
        Swal.fire('Error', 'No se pudo subir la foto', 'error')
        this.router.navigate([`/feed`])
      }
    )
  }

  create(){
    this.kittyPost.kitty = this.kitty;
    this.kittyPost.prruwner = this.prruwner;
    console.log(this.kittyPost)
    this.kittyPostService.create(this.kittyPost).subscribe(kittyPost => {
      this.kittyPost = kittyPost
      Swal.fire('Nuevo Post', `Has publicado un nuevo kittyPost, gracias!`, 'success')
      this.subirFoto();
    })
  }

}
