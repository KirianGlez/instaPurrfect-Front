import { AuthService } from '@auth0/auth0-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {

  constructor(public auth: AuthService, public router: Router){}

  logout(){
    this.auth.logout()
  }

  editar(){
    this.router.navigate(['/prruwner', true]);
  }

}
