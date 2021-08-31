import { Alerta } from './../../model/alerta';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
    titulo: 'Sucesso!',
    descricao: 'Seu registro foi cadastrado com sucesso',
    btnSuccess: 'Ir para a listagem',
    btnCancel: 'Cadastrar um novo filme',
    corBtnSuccess: 'primary',
    corBtnCancel:'warn',
    possuirBtnFechar: false
  } as Alerta ;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data){
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSuccess = this.data.btnSuccess || this.alerta.btnSuccess;
      this.alerta.btnCancel = this.data.btnCancel || this.alerta.btnCancel;
      this.alerta.corBtnSuccess = this.data.corBtnSuccess || this.alerta.corBtnSuccess;
      this.alerta.corBtnCancel = this.data.corBtnCancel || this.alerta.corBtnCancel;
      this.alerta.possuirBtnFechar = this.data.possuirBtnFechar || this.alerta.possuirBtnFechar;
    }
  }

}


