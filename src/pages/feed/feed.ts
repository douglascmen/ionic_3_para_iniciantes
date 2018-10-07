import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailPage } from '../movie-detail/movie-detail';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Douglas Men",
    data: "04 de Outubro de 2018",
    descricao: "Estou criando um app incrível",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h atrás" 
  };
  public lista_filmes = new Array<any>();
  public loader;
  public refresher;
  public isRefreshing: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,   
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    alert(num1 + num2);  
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;    
    this.isRefreshing = true;
    this.loadMovies();
  }

  loadMovies(){
    this.presentLoading();
    this.movieProvider.getPopularMovies().subscribe(
      data => {                
        const response = (data as any);        
        const objeto = JSON.parse(response._body);
        this.lista_filmes = objeto.results;        
        this.closeLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      error => {
        console.log(error);
        this.closeLoading();
        if(this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    );
  }

  openDetail(filme){
    this.navCtrl.push(MovieDetailPage, { id: filme.id });
  }

  ionViewDidEnter() { 
    this.loadMovies();
  }

}
