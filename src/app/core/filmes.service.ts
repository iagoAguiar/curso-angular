import { Filme } from './../shared/models/filme';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:3000/filmes/'

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme>{
    return this.http.post<Filme>(url, filme)

  }

  listar(pagina: number, qtdPagina:number): Observable<Filme[]>{
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', pagina.toString())
    httpParams = httpParams.set('_limit', pagina.toString());
    return this.http.get<Filme[]>(url, {params: httpParams });
  }
}
