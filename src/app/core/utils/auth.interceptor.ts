import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConstantesApp } from '../../utils/constantes-app'
import { environment } from '../../../../src/environments/environment'
import { DialogService }  from 'primeng/dynamicdialog';
import { MensajeModalComponent } from '../mensaje-modal/mensaje-modal.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  ref: any;

  private readonly URLS_BASE_ENDPOINTS : string[] = [environment.urlBase];

  constructor(public dialogService: DialogService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if ( this.isUrlValidarLogin(request.url) ) {
      return next.handle(request);
    }

    if ( this.tieneUrlBaseEndpoint(request.url) ) {
      const token: string = sessionStorage.getItem(ConstantesApp.KEY_SESSION_TOKEN);
      const authReq = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(authReq).pipe(catchError( err => this.handleAuthError(err)));
    } else {
      return next.handle(request);
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    if (err.status === 401 || err.status === 0) {
        this.ref = this.dialogService.open(MensajeModalComponent,
          {
            data: {
              mensaje: 'La sesión ha expirado, para seguir trabajando necesita volver a ingresar su usuario y clave en el sistema.'
            },
            showHeader: false,
            closable: false,
            width: '30vw',
            baseZIndex: 100000
          });
      return EMPTY;
    }

    return throwError(err);
  }

  private isUrlValidarLogin(url: string) : boolean {
    return url.indexOf("validarlogin") > -1
  }

  private tieneUrlBaseEndpoint(url: string) : boolean {

    let resultado : boolean = false;

    this.URLS_BASE_ENDPOINTS.forEach( (urlBase: string) => {
      if ( url.indexOf(urlBase) > -1 ) {
        resultado = true;
        return;
      }
    });

    return resultado;
  }
}
