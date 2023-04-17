import { AuthService } from '@auth0/auth0-angular';
import { Prruwner } from './../../models/Prruwner';
import { Component, Input, OnInit } from '@angular/core';
import { KittyPost } from 'src/app/models/KittyPost';
import { PrruwnerService } from 'src/app/services/prruwner.service';
import { environment } from 'src/environments/environment';
import { KittyPostService } from 'src/app/services/kittyPost.service';
import { KittyPostLike } from 'src/app/models/KittyPostLike';

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

  user: Prruwner;

  like: boolean;

  kittyPostLike: KittyPostLike;

  host: string;

  constructor(private prruwnerService:PrruwnerService, private kittyPostService: KittyPostService, public auth: AuthService){

  }

  ngOnInit(): void {
    this.host = environment.host;
    this.auth.isAuthenticated$.subscribe( auth => {
      if(!auth){
        this.auth.loginWithRedirect();
      }else{
        this.auth.user$.subscribe( user => {
          this.prruwnerService.getPrruwnerByOauthId(user?.sub!).subscribe(
            (prruwner) => {
              this.user = prruwner;

              if(this.post.kittyPostLikes.find(item => item.prruwnerId === this.user.prruwnerId)){
                this.like=true;
              }else{
                this.like=false;
              }
            }
          )
        })

      }
    })
  }

  darLike(){
    this.kittyPostService.newkittyPostLike(this.prruwner.prruwnerId, this.post.kittyPostId).subscribe(
      like => {this.like=true;this.post.kittyPostLikes.push(like); this.kittyPostLike = like}
    )
  }

  quitarLike(){
    this.kittyPostService.deletePostLike(this.prruwner.prruwnerId, this.post.kittyPostId).subscribe(
      recibido => {
        console.log(recibido);
        let index = this.post.kittyPostLikes.indexOf(this.kittyPostLike);
          if (index !== -1) {
            this.post.kittyPostLikes.splice(index, 1);
          }
      }
    )
    this.like=false;
  }

}
