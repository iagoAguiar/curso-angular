import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { Alerta } from './../../shared/model/alerta';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  id: number;

  constructor(
      private filmeService:FilmesService, 
      public validacao: ValidarCamposService,  
      public dialog: MatDialog,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];
    if(this.id){
      this.filmeService.visualizar(this.id).subscribe(
        (filme: Filme) => this.criarFormulario(filme))
    } else{
      this.criarFormulario(this.criarFilmeEmBranco());
    }
  
    this.generos = ["Acao", "Romance", "Aventura", "Terro", "Ficção Cientifica", "Comédia", "Drama"];
  }
  submit(): void{
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    if(this.id){
    filme.id = this.id;
      this.editar(filme);
    }else{
      this.salvar(filme);
    }
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void{
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [ filme.urlFoto, [ Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [ Validators.required]],
      descricao: [ filme.descricao],
      nota: [filme.nota, [ Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: [ filme.urlIMDB, [ Validators.minLength(10)]],
      genero: [ filme.genero, [ Validators.required]],
      
    });
  }

  private criarFilmeEmBranco(): Filme{
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlIMDB: null,
      genero: null,

    }as Filme;
  } 

  private salvar(filme:Filme): void{
    this.filmeService.salvar(filme).subscribe(()=> {
      const config ={
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancel: 'primary',
          possuirBtnFechar: true
        } as Alerta
      }
      const diagoloRef = this.dialog.open(AlertaComponent, config);
      diagoloRef.afterClosed().subscribe(
        (opcao: boolean) => {
          if(opcao){
            this.router.navigateByUrl('filmes');
          } else {
            this.reiniciarForm();
          }
        }
      )
    },
    ()=>{
      const config ={
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'não conseguimos salvar seu registro, favor conferir o formulários',
          btnSucesso: 'Fechar',
          corBtnSucesso: 'warn'
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config);
    } );
  }
  private editar(filme:Filme): void{
    this.filmeService.editar(filme).subscribe(()=> {
      const config ={
        data: {
          descricao: 'Seu registro foi atualizado com sucesso.',
          btnSuccess: 'Ir para a listagem'
        } as Alerta
      }
      const diagoloRef = this.dialog.open(AlertaComponent, config);
      diagoloRef.afterClosed().subscribe(() => {
            this.router.navigateByUrl('filmes');
          }
      )
    },
    ()=>{
      const config ={
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'não conseguimos editar seu registro, favor conferir o formulários',
          btnSucesso: 'Fechar',
          corBtnSucesso: 'warn'
        } as Alerta
      }
      this.dialog.open(AlertaComponent, config);
    } );
  }
}
