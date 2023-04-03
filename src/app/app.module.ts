import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { PrruwnerPageComponent } from './prruwner-page/prruwner-page.component';
import { PrruwnerService } from './services/prruwner.service';
import { RouterModule, Routes } from '@angular/router';
import { FeedPageComponent } from './feed-page/feed-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PostsComponent } from './prruwner-page/posts/posts.component';
import { HeaderComponent } from './feed-page/header/header.component';
import { FeedPostsComponent } from './feed-page/feed-posts/feed-posts.component';
import { KittyPageComponent } from './kitty-page/kitty-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/prruwner', pathMatch: 'full'},
  {path: 'prruwner', component: PrruwnerPageComponent},
  {path: 'feed', component: FeedPageComponent},
  {path: 'kitty/:id', component: KittyPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PrruwnerPageComponent,
    FeedPageComponent,
    PostsComponent,
    HeaderComponent,
    FeedPostsComponent,
    KittyPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [PrruwnerService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
