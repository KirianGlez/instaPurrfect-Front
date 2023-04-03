import { Prruwner } from './../../models/Prruwner';
import { Component, Input } from '@angular/core';
import { KittyPost } from 'src/app/models/KittyPost';

@Component({
  selector: 'app-feed-posts',
  templateUrl: './feed-posts.component.html',
  styleUrls: ['./feed-posts.component.css']
})
export class FeedPostsComponent {
  @Input()
  post: KittyPost;

  @Input()
  prruwner: Prruwner;
}
