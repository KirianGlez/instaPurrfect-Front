import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KittyService } from 'src/app/services/kitty.service';
import { Kitty } from 'src/app/models/Kitty';
import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { PrruwnerService } from 'src/app/services/prruwner.service';
import { Prruwner } from 'src/app/models/Prruwner';
import { Router } from '@angular/router';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-register-kitty',
  templateUrl: './register-kitty.component.html',
  styleUrls: ['./register-kitty.component.css']
})
export class RegisterKittyComponent implements OnInit{
  host: string;
  private fotoSeleccionada: File;
  kitty: Kitty = new Kitty();
  prruwner: Prruwner = new Prruwner();
  @Input() kittyId: number;
  imageSrc: string;

  constructor(private imagesService: ImagesService, private kittyService: KittyService,public auth: AuthService,private prruwnerService:PrruwnerService,private router: Router) {

  }

  ngOnInit(): void {
    this.host = environment.host;
    if(this.kittyId != -1){
      this.kittyService.getKitty(this.kittyId).subscribe(
        kitty => this.kitty = kitty
      )
    }
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

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  subirFoto() {
    this.imagesService.uploadImage(this.fotoSeleccionada, this.fotoSeleccionada.name).subscribe(
      image => {this.kitty.kittyPicture = image; this.create() } , 
      error => {
        Swal.fire('Error', error, 'error')
        this.router.navigate([`/feed`])
      }
    );
  }

  create() {
    this.kitty.prruwnerId = this.prruwner.prruwnerId;
    this.kittyService.create(this.kitty).subscribe(kitty => {
      this.kitty = kitty
      this.router.navigate([`/kitty/` + this.kitty.kittyId]);
    });
  }

  delete() {
    this.kittyService.deleteKitty(this.kittyId).subscribe(
      recibido => this.router.navigate([`/feed`]),
      error => {
        Swal.fire('Error', 'No se pudo eliminar', 'error')
        this.router.navigate([`/feed`])
      }
    )
  }

}
