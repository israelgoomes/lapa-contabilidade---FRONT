import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalRequisicaoComponent } from '../modal-requisicao/modal-requisicao.component';

@Component({
  selector: 'app-modal-upload-admin',
  templateUrl: './modal-upload-admin.component.html',
  styleUrls: ['./modal-upload-admin.component.css']
})
export class ModalUploadAdminComponent implements OnInit {

  uploadForm: FormGroup;
  files: Set<File>;

  constructor(
    public dialogRef: MatDialogRef<ModalRequisicaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.uploadForm = fb.group({
      nmDocumento: ['', Validators.required],
      tpDocumento: ['sl', Validators.required],
      cdSolicitacao: data.cdSolicitacao,
      idResponse: data.idResponse,
      adminClient: 'client',
      file: ''
    })
  }


  // ID_DOC_SOLICITACAO, TP_DOCUMENTO, ID_RES_SOLICITACAO, CAMINHO, NM_DOCUMENTO, DT_CRIACAO, CD_SOLICITACAO

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(e) {
    const selectedFiles = <FileList>e.srcElement.files;
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }
    this.uploadForm.patchValue({ file: this.files });

  }

  ngOnInit(): void {
  }

}
