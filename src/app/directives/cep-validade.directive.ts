import { ConsultaCepService } from './../service/consulta-cep.service';
import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, map} from 'rxjs';

@Directive({
  selector: '[validadorCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: CepValidadeDirective,
    multi: true
  }]
})
export class CepValidadeDirective implements AsyncValidator {

  constructor(
    private consultaCepService: ConsultaCepService
  ) { }
  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return this.consultaCepService.consultaCep(cep).pipe(map(
      (resultado: any) => resultado.erro ? {'validadoCep': true} : null
    ))
  }
}
