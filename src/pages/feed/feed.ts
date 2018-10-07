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
  public page = 1;
  public infiniteScroll;

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

  doInfinite(infiniteScroll) {   
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadMovies(true);
  }

  loadMovies(newPage:boolean = false){
    this.presentLoading();
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data => {                
        const response = (data as any);        
        const objeto = JSON.parse(response._body);
        
        if(newPage){
          this.lista_filmes = this.lista_filmes.concat(objeto.results);        
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = objeto.results;
        }       
        
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
