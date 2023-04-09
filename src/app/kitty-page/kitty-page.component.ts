import { KittyService } from './../services/kitty.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kitty } from '../models/Kitty';
import { KittyPost } from '../models/KittyPost';
import { environment } from 'src/environments/environment';

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

  constructor(private route: ActivatedRoute, private kittyService:KittyService) {}

  ngOnInit() {
    this.host = environment.host;
    if(this.route.snapshot.paramMap.get('editar')){
      this.editar = true;
      this.kittyId = Number(this.route.snapshot.paramMap.get('id'))
    }else{
      this.kittyService.getKitty(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        kitty => {this.kitty = kitty; console.log('hola')}
      )

      this.kittyService.getKittyKittyPosts(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        kittyPosts => this.kittyPosts = kittyPosts
      )
    }
  }
}
