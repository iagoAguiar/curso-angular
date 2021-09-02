import { Router } from '@angular/router';
import { ConfigParams } from './../../shared/models/config-params';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import {  debounceTime } from 'rxjs/operators'
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg';
  
  config: ConfigParams={
    pagina: 0,
    limite: 4
    
  }
  filmes:Filme[] = [];
  filtrosListagem: FormGroup;
  generos: Array<string>

  constructor(private filmesService: FilmesService, 
        private fb: FormBuilder, 
        private router: Router) { }


  ngOnInit() {

    this.filtrosListagem = this.fb.group(
      {
        texto: [''],
        genero: ['']
      })
      this.filtrosListagem.get('texto').valueChanges
        .pipe(debounceTime(400))
        .subscribe((val: string) =>{
        this.config.pesquisa = val;
        this.resetarConsulta();
      })
      this.filtrosListagem.get('genero').valueChanges.subscribe((val: string) =>{
        this.config.campo = {tipo: 'genero', valor: val};
        this.resetarConsulta();
      })
      this.generos = ["Acao", "Romance", "Aventura", "Terro", "Ficção Cientifica", "Comédia", "Drama"];

    this.listarFilmes();
  }
  
  onScroll(): void{ 
    
    this.listarFilmes();
  }

  abrir(id: number):void{
    this.router.navigateByUrl('/filmes/' + id);
  }

  private listarFilmes(): void{
    this.config.pagina++;
    this.filmesService.listar(this.config)
      .subscribe((filmes: Filme[]) => this.filmes.push(...filmes));

  }

  private resetarConsulta(): void{
    this.config.pagina = 0;
    this.filmes= [];
    this.listarFilmes();
  }
  
}
function debouceTime(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

