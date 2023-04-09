import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Prruwner } from '../models/Prruwner';
import { PrruwnerService } from '../services/prruwner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user:any;
  prruwner: Prruwner = new Prruwner();

  constructor(public auth: AuthService, public prruwnerService:PrruwnerService, public router: Router){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe( auth => {
      if(!auth){
        this.auth.loginWithRedirect();
      }else{
        this.auth.user$.subscribe( user => {
          this.user = user;
          this.prruwner.prruwnerName = user?.nickname!;
          this.prruwner.prruwnerOauthId = user?.sub!;
        })
      }
    })
  }

  create() {
    this.prruwnerService.create(this.prruwner).subscribe(prruwner => {
      this.router.navigate(['/feed']);
      Swal.fire('Nuevo Prruwner', `Bienvenido a InstaPurrfect ${prruwner.prruwnerName} !`, 'success')
    })
  }

}
