import { KittyService } from './../services/kitty.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kitty } from '../models/Kitty';
import { KittyPost } from '../models/KittyPost';

@Component({
  selector: 'app-kitty-page',
  templateUrl: './kitty-page.component.html',
  styleUrls: ['./kitty-page.component.css']
})
export class KittyPageComponent implements OnInit{

  kitty: Kitty;
  kittyPosts: KittyPost[];

  constructor(private route: ActivatedRoute, private kittyService:KittyService) {}

  ngOnInit() {
    this.kittyService.getKitty(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      kitty => this.kitty = kitty
    )

    this.kittyService.getKittyKittyPosts(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
      kittyPosts => this.kittyPosts = kittyPosts
    )
  }
}
