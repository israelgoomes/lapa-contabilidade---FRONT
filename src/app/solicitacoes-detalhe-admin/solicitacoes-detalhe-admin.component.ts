import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../servicos/solicitacao-service/solicitacao.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UploadService } from '../servicos/upload-service/upload.service';
import { ModalUploadAdminComponent } from '../modal-upload-admin/modal-upload-admin.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-solicitacoes-detalhe-admin',
  templateUrl: './solicitacoes-detalhe-admin.component.html',
  styleUrls: ['./solicitacoes-detalhe-admin.component.css']
})
export class SolicitacoesDetalheAdminComponent implements OnInit {
  idResSolicitacao;
  cliente;
  constructor(private router: Router,
    private solicitacaoSrvc: SolicitacaoService,
    private fb: FormBuilder,
    private uploadSrvc: UploadService,
    public dialog: MatDialog,
    private spinnerSrvc: NgxUiLoaderService
  ) {
    if (!history.state.data || !history.state.cliente) {
      this.router.navigate(['/admin-home'])
      return
    }
    this.cliente = history.state.cliente;
    this.solicitacao = history.state.data;
    this.respostaForm = fb.group({
      resposta: ['', Validators.required],
      idSolicitacao: this.solicitacao.idSolicitacao,
      cdSolicitacao: this.solicitacao.cdSolicitacao,
      adminClient: 'admin',
      email: this.cliente.email
    })


  }
  solicitacao;
  respostas;
  respostaForm: FormGroup
  response;
  file;
  haveFile;
  finalizada: boolean = false;
  ngOnInit(): void {
    if (this.solicitacao.ativo == 'N') {
      this.respostaForm.disable();
    }
    this.solicitacaoSrvc.listarRespostas(this.solicitacao.idSolicitacao, this.solicitacao.cdSolicitacao)
      .subscribe(response => {
        this.respostas = response
      })
  }

  responder() {
    if (!this.file) {
      this.solicitacaoSrvc.responder(this.respostaForm.value).subscribe(response => {
        // this.idResSolicitacao = response.idResponse
        this.respostaForm.get('resposta').reset()
        this.ngOnInit();
      });
    } else {
      this.solicitacaoSrvc.responder(this.respostaForm.value).subscribe(response => {
        this.idResSolicitacao = response.idResponse

        let document = {
          tpDocumento: this.file.tpDocumento,
          idResSolicitacao: response.idResponse,
          nmDocumento: this.file.nmDocumento,
          cdSolicitacao: this.file.cdSolicitacao
        }


        this.uploadSrvc.uploadSolicitacoes(this.file.file, document).subscribe(response => {
          this.ngOnInit();
        })
        this.respostaForm.get('resposta').reset()
      });
    }
  }

  download(resposta) {
    this.uploadSrvc.download(resposta.path).subscribe(response => {
      const file = new Blob([response], {
        type: response.type
      });

      // this.spinnerSrvc.stopLoader('doc-loader')
      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = `${resposta.nmDocumento}.pdf`
      link.click();

      window.URL.revokeObjectURL(blob);
      link.remove();
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalUploadAdminComponent, {
      width: '600px',
      // height: '600px',
      data: { idResponse: this.idResSolicitacao, cdSolicitacao: this.solicitacao.cdSolicitacao }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.file = result;
      this.haveFile = result.file
      // this.solicitacaoSrvc.criarSolicitacao(result).subscribe(response => {
      //   console.log('Solicitacao enviada com sucesso', response)
      //   this.ngOnInit();
      // });
    });
  }


  deleteResponse(id) {
    this.solicitacaoSrvc.deletarResposta(id).subscribe(response => {
      this.ngOnInit();
    })
  }

  finalizar() {
    this.spinnerSrvc.startLoader('detalhe-admin');
    this.solicitacaoSrvc.finalizaSolicitacao(this.solicitacao.idSolicitacao).subscribe(response => {
      this.spinnerSrvc.stopLoader('detalhe-admin');
      this.finalizada = true;
      this.respostaForm.disable();
      this.dialog.open(DialogComponent, {
        width: '450px',
        data: { text: 'Solicitação', subText: `A solicitação ${this.solicitacao.cdSolicitacao} foi finalizada.`, icon: 'cloud_upload' }
      });
    }, error => {
      this.spinnerSrvc.stopLoader('detalhe-admin');
    })

  }


}
