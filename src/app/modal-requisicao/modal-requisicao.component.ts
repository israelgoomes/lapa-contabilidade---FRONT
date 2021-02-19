import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-requisicao',
  templateUrl: './modal-requisicao.component.html',
  styleUrls: ['./modal-requisicao.component.css']
})
export class ModalRequisicaoComponent implements OnInit {
  solicitacaoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalRequisicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.solicitacaoForm = fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      idUser: data.user.idUser,
      adminClient: 'client',
      cliente: data.user.nome,
      email: 'rael_goomes@hotmail.com'
      // email: 'contato@assessorialapa.com'
    })
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
