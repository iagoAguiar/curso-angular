import { HttpParams } from '@angular/common/http';
import { ConfigParams } from './../shared/models/config-params';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }


  configurarParametros(config: ConfigParams): HttpParams{
    let httpParams = new HttpParams();
    if(config.pagina){

      httpParams = httpParams.set('_page', config.pagina.toString());
    }
    if(config.limite){
    httpParams = httpParams.set('_limit', config.limite.toString());
    }
    if(config.pesquisa){
      httpParams = httpParams.set('q', config.pesquisa);
    }
    if(config.campo){
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
      
    }
    httpParams = httpParams.set('sort', 'id');
    httpParams = httpParams.set('order', 'desc');

    return httpParams;
  }
}
