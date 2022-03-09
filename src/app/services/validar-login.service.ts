import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { AppEndpointConfig, APP_ENDPOINT_CONFIG } from '../utils/app-endpoint-config';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Estado } from '../model/estado.enum';
import { Respuesta } from '../model/respuesta';
import { TokenUsuario } from '../model/token-usuario'

@Injectable()
export class ValidarLoginService {

  private URL_RESOURCE_VALIDAR_LOGIN : string;

  private rptaTokenUsuarioSource = new BehaviorSubject<Respuesta<TokenUsuario>>(null);
  public rptaTokenUsuario$ = this.rptaTokenUsuarioSource.asObservable();

  constructor(private http: HttpClient, @Inject(APP_ENDPOINT_CONFIG) private appEndPointConfig : AppEndpointConfig) {
    this.URL_RESOURCE_VALIDAR_LOGIN = appEndPointConfig.validarLogin;
  }

  validar(usario: string, clave: string) : void {

    this.rptaTokenUsuarioSource.next(Respuesta.create(null, Estado.LOADING));

    this.validarLoginHttp(usario, clave).subscribe( ( respuesta: Respuesta<TokenUsuario> ) => {
      this.rptaTokenUsuarioSource.next(respuesta);
    });

  }

  private validarLoginHttp (usario: string, clave: string) : Observable<Respuesta<TokenUsuario>> {

    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = {};

    const params = new HttpParams()
    .append('user', usario)
    .append('password', clave);

    return this.http.post<any>(this.URL_RESOURCE_VALIDAR_LOGIN, body, {
        headers: headers,
        params: params,
    })
    .pipe(
      map( (tokenUsuario : TokenUsuario)  => {
        return Respuesta.create(tokenUsuario, Estado.SUCCESS);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        this.rptaTokenUsuarioSource.next(Respuesta.createFromErrorHttp(error));
        return throwError(error);
        })
    );
  }

}
