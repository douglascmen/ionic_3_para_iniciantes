import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedPage } from './feed';
import { MovieDetailPageModule } from '../movie-detail/movie-detail.module';

@NgModule({
  declarations: [
    FeedPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedPage),
    MovieDetailPageModule
  ],
})
export class FeedPageModule {}
