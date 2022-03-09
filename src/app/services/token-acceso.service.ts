import { Injectable } from '@angular/core';

import { ConstantesApp } from '../utils/constantes-app';

@Injectable({
  providedIn: 'root'
})
export class TokenAccesoService {

  constructor() { }

  guardarTokenSession(token: string) : void {
    sessionStorage.setItem(ConstantesApp.KEY_SESSION_TOKEN, token);
  }

  get token() : any {
    return sessionStorage.getItem(ConstantesApp.KEY_SESSION_TOKEN);
  }

}
