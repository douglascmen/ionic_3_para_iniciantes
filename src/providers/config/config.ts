import { Injectable } from '@angular/core';

const config_key_name = "config";

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
    name: "",
    username: ""
  };

  constructor() {
    
  }

  // Recupera os dados de configurações do local storage
  getConfigData():any {
    return localStorage.getItem(config_key_name);
  }

  // Grava os dados de configurações do local storage
  setConfigData(showSlide?:boolean, name?:string, username?:string) {
    let config = {
      showSlide: false,
      name: "",
      username: ""
    };

    if(showSlide) {
      config.showSlide = showSlide;
    }

    if(name) {
      config.name = name;
    }

    if(username) {
      config.username = username;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }

  

}
