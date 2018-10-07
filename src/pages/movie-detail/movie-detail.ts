import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
  providers: [
    MovieProvider
  ]
})
export class MovieDetailPage {
  public filme;
  public filmeId;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MovieProvider) {
  }

  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id");    
    this.movieProvider.getMovieDetail(this.filmeId).subscribe(
      data=>{
        let retorno = (data as any)._body;
        this.filme = JSON.parse(retorno);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
