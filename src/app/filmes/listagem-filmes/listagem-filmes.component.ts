import { FilmesService } from 'src/app/core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes:Filme[] = [];
  pagina: 0;
  readonly qtdPagina = 4;

  constructor(private filmesService: FilmesService) { }


  ngOnInit() {
    this.listarFilmes();
  }
  
  onScroll(): void{ 
    
    this.listarFilmes();
  }
  private listarFilmes(): void{
    this.pagina++;
    this.filmesService.listar(this.pagina, this.qtdPagina).subscribe((filmes: Filme[]) => this.filmes.push(...filmes));

  }
  
}
