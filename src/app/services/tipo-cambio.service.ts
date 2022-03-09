import { Inject, Injectable } from '@angular/core';

import { AppEndpointConfig, APP_ENDPOINT_CONFIG } from '../utils/app-endpoint-config';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCambio } from '../model/tipo-cambio.model';

@Injectable()
export class TipoCambioService {

  constructor(private http: HttpClient,
    @Inject(APP_ENDPOINT_CONFIG) private appEndPointConfig: AppEndpointConfig) { }

   listar() : Observable<TipoCambio[]> {
    let url : string = this.appEndPointConfig.tiposDeCambio;
    return this.http.get<TipoCambio[]>(url);
   }

}
