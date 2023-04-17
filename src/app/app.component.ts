import { PrruwnerService } from './services/prruwner.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'instapurrfect';
  constructor(public auth: AuthService, public prruwnerService:PrruwnerService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe( auth => {
      if(!auth){
        this.auth.loginWithRedirect();
      }else{
        this.auth.user$.subscribe( user => {
          this.prruwnerService.getPrruwnerByOauthId(user?.sub!).subscribe(
            (prruwner) => {
            },
            (error) => {
              this.router.navigate([`/login`], { relativeTo: this.route });
            }
          )
        })

      }
    })
  }
}
