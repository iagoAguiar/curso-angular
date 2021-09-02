import { FilmesService } from 'src/app/core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/shared/models/filme';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/model/alerta';

@Component({
  selector: 'visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme: Filme;
  readonly semFoto = 'https://www.actbus.net/fleetwiki/images/8/84/Noimage.jpg';

  id:number;

  constructor(
      private activeRoute: ActivatedRoute,
      private router: Router,
      public dialog: MatDialog,
      private filmeService: FilmesService) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    this.visualizar();
  }

  private visualizar(): void{
    this.filmeService.visualizar(this.id).subscribe(
      (filme: Filme) => this.filme = filme);
  }

  private editar(): void{
    this.router.navigateByUrl('filmes/cadastro' + this.id);
  }

  excluir(): void{
      const config ={
        data: {
          titulo: 'Você tem certeza que deseja excluir?',
          descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
          corBtnCancel: 'primary',
          corBtnSuccess: 'warn',
          possuirBtnFechar: true
        } as Alerta
      }
      const diagoloRef = this.dialog.open(AlertaComponent, config);
      diagoloRef.afterClosed().subscribe(
        (opcao: boolean) => {
          if(opcao){
            this.filmeService.excluir(this.id).subscribe(() => {
              this.router.navigateByUrl('/filmes');
            });
          } 
        }
      )
  }


}
