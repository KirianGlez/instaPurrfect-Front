import { KittyPost } from './../../models/KittyPost';
import { Component,OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{

  @Input()
  post: KittyPost;

  host: string;

  ngOnInit(): void {
    this.host = environment.host;
  }

}
