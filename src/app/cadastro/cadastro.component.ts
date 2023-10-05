import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private ConsultacepService: ConsultaCepService
  ) {}

  ngOnInit(): void {
  }

  cadastrar(form: NgForm){
    console.log(form.controls);
  }

  consultaCEP(env: any, f: NgForm) {
    const cep = env.target.value;
    if(cep !== '') {
      this.ConsultacepService.consultaCep(cep).subscribe(resultado => {
        this.populandoEndereco(resultado, f)
      });
    }
  }

  populandoEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      bairro: dados.bairro,
      estado: dados.uf,
      cidade: dados.localidade
    })
  }
}
