import { Prruwner } from './../../models/Prruwner';
import { Component, Input, OnInit } from '@angular/core';
import { KittyPost } from 'src/app/models/KittyPost';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent implements OnInit{

  @Input()
  post: KittyPost;

  @Input()
  prruwner: Prruwner;

  host: string;

  ngOnInit(): void {
    this.host = environment.host;
  }

}
