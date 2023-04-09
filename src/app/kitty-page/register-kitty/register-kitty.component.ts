import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KittyService } from 'src/app/services/kitty.service';
import { Kitty } from 'src/app/models/Kitty';
import Swal from 'sweetalert2';
import { AuthService } from '@auth0/auth0-angular';
import { PrruwnerService } from 'src/app/services/prruwner.service';
import { Prruwner } from 'src/app/models/Prruwner';
import { Router } from '@angular/router';

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

  constructor(private kittyService: KittyService,public auth: AuthService,private prruwnerService:PrruwnerService,private router: Router) {

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
  }

  subirFoto() {
    this.kittyService.putPicture(this.fotoSeleccionada, this.kitty.kittyId.toString()).subscribe(
      kitty => {
        this.kitty = kitty;
        Swal.fire('La foto se ha cambiado correctamente!' , 'La foto se ha cambiado correctamente!', 'success')
      }
    )
  }

  create() {
    this.kitty.prruwnerId = this.prruwner.prruwnerId;
    console.log(this.kitty);
    console.log(this.fotoSeleccionada);
    this.kittyService.create(this.kitty).subscribe(kitty => {
      this.kitty = kitty
      Swal.fire('Nuevo Kitty', `Bienvenido a InstaPurrfect ${kitty.kittyName} !`, 'success')
      this.subirFoto();
    });
  }

  delete() {
    console.log(this.kittyId);
    this.kittyService.deleteKitty(this.kittyId);
  }

}
