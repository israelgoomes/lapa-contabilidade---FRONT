import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitacaoService } from '../servicos/solicitacao-service/solicitacao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadService } from '../servicos/upload-service/upload.service';

@Component({
  selector: 'app-solicitacao-detalhe',
  templateUrl: './solicitacao-detalhe.component.html',
  styleUrls: ['./solicitacao-detalhe.component.css']
})
export class SolicitacaoDetalheComponent implements OnInit {

  constructor(private router: Router,
    private solicitacaoSrvc: SolicitacaoService,
    private fb: FormBuilder,
    private uploadSrvc: UploadService
  ) {
    if (!history.state.data) {
      this.router.navigate(['/solicitacoes'])
      return
    }
    this.solicitacao = history.state.data
    this.respostaForm = fb.group({
      resposta: ['', Validators.required],
      idSolicitacao: this.solicitacao.idSolicitacao,
      cdSolicitacao: this.solicitacao.cdSolicitacao,
      adminClient: 'client'
    })


  }
  solicitacao;
  respostas;
  respostaForm: FormGroup
  response;
  ngOnInit(): void {
    if (this.solicitacao.ativo == 'N') {
      this.respostaForm.disable()
    }
    // if (!history.state.data) {
    //   this.router.navigate(['/solicitacoes'])
    //   return
    // }


    this.solicitacaoSrvc.listarRespostas(this.solicitacao.idSolicitacao, this.solicitacao.cdSolicitacao)
      .subscribe(response => {
        this.respostas = response
      })
  }

  responder() {
    this.solicitacaoSrvc.responder(this.respostaForm.value).subscribe(response => {
      this.respostaForm.reset();
      this.ngOnInit();
    });
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

}
