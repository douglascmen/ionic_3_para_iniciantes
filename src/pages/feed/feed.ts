import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,   
    private movieProvider: MovieProvider) {
  }

  public somaDoisNumeros(num1:number, num2:number): void{
    alert(num1 + num2);  
  }

  ionViewDidLoad() { 
    this.movieProvider.getPopularMovies().subscribe(
      data => {                
        const response = (data as any);        
        const objeto = JSON.parse(response._body);
        this.lista_filmes = objeto.results;        
      },
      error => {
        console.log(error);
      }
    );
  }

}
