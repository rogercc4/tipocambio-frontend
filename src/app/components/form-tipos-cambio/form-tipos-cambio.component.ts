import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TipoCambio } from '../../model/tipo-cambio.model';
import { TipoCambioService } from 'src/app/services/tipo-cambio.service';

@Component({
  selector: 'app-form-tipos-cambio',
  templateUrl: './form-tipos-cambio.component.html',
  styleUrls: ['./form-tipos-cambio.component.css'],
  providers: [TipoCambioService]
})
export class FormTiposCambioComponent implements OnInit {

  tiposDeCambio$ : Observable<TipoCambio[]>


  constructor(private tipoCambioService: TipoCambioService) { }

  ngOnInit(): void {
    this.tiposDeCambio$ = this.tipoCambioService.listar();
  }

}
