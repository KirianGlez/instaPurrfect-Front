import { Component, Input, OnInit } from '@angular/core';
import { KittyPost } from 'src/app/models/KittyPost';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-find-page-posts',
  templateUrl: './find-page-posts.component.html',
  styleUrls: ['./find-page-posts.component.css']
})
export class FindPagePostsComponent implements OnInit{
  @Input()
  post: KittyPost;

  host: string;

  ngOnInit(): void {
    this.host = environment.host;
  }
}
