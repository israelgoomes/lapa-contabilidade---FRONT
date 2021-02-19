import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from '../servicos/upload-service/upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  cliente;
  uploadForm: FormGroup;

  files: Set<File>;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private uploadSrvc: UploadService,
    private fb: FormBuilder,
    private spinnerSrvc: NgxUiLoaderService,
    public dialog: MatDialog) {

    this.cliente = history.state.cliente;
    if (!this.cliente) {
      this.router.navigate(['/admin-home']);
      return
    }
    this.uploadForm = fb.group({
      tpDocumento: '',
      mesRef: '',
      nmDocumento: '',
      idUser: this.cliente.idUser
    })


  }

  ngOnInit(): void {
    console.log('History', history.state.cliente)
    this.cliente = history.state.cliente;
    this.uploadForm = this.fb.group({
      tpDocumento: '',
      mesRef: '',
      nmDocumento: '',
      idUser: this.cliente.idUser
    })
  }

  onChange(e) {
    const selectedFiles = <FileList>e.srcElement.files;
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }

  }

  onUpload() {
    let data = this.uploadForm.value
    if (this.files && this.files.size > 0) {
      this.spinnerSrvc.startLoader('upload-loader');

      this.uploadSrvc.upload(this.files, data).subscribe(response => {
        this.uploadForm.reset();
        let input: any = document.querySelector('.form-control')
        input.value = '';
        this.spinnerSrvc.stopLoader('upload-loader');

        this.dialog.open(DialogComponent, {
          width: '450px',
          data: { text: 'Upload', subText: 'Upload Realizado com sucesso!', icon: 'cloud_upload' }
        });
        this.ngOnInit();
      }, error => {
        this.ngOnInit();
        this.spinnerSrvc.stopLoader('upload-loader');
      })
    }
  }
}
