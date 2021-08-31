import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { Alerta } from './../../shared/model/alerta';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filme } from 'src/app/shared/models/filme';
import { FilmesService } from 'src/app/core/filmes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>

  constructor(
      private filmeService:FilmesService, 
      public validacao: ValidarCamposService,  
      public dialog: MatDialog,
      private router: Router,
      private fb: FormBuilder) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [ '', [ Validators.minLength(10)]],
      dtLancamento: ['', [ Validators.required]],
      descricao: [ ''],
      nota: [0, [ Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDB: [ '', [ Validators.minLength(10)]],
      genero: [ '', [ Validators.required]],
      
    });
    this.generos = ["Acao", "Romance", "Aventura", "Terro", "Ficção Cientifica", "Comédia", "Drama"];
  }
  submit(): void{
    console.log("teste")
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
  }

  reiniciarForm(): void{
    this.cadastro.reset();
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
}
