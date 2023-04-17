import { KittyPostService } from 'src/app/services/kittyPost.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { KittyPost } from '../models/KittyPost';
import { Kitty } from '../models/Kitty';
import { KittyService } from '../services/kitty.service';


@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.css']
})
export class FindPageComponent implements OnInit{
  host: string;
  kittyPosts: KittyPost[];
  kitties: Kitty[];
  inputValue: string;
  buscando: boolean = false;

  constructor(private kittyPostService: KittyPostService, private kittyService: KittyService){
  }

  ngOnInit() {
    this.host = environment.host;
    this.kittyPostService.find30random().subscribe(
      kittyPosts => {this.kittyPosts = kittyPosts;}
    )
  }

  onInput() {
    this.buscando=true;
    this.kittyService.findByNameCoincidnce(this.inputValue).subscribe(
      kitties => {this.kitties = kitties; console.log(kitties)}
    )
  }

}
