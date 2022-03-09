import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/model/estado.enum';
import { Respuesta } from 'src/app/model/respuesta';
import { TokenUsuario } from 'src/app/model/token-usuario';
import { ValidarLoginService } from 'src/app/services/validar-login.service';
import { TokenAccesoService } from 'src/app/services/token-acceso.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form-validar-login',
  templateUrl: './form-validar-login.component.html',
  styleUrls: ['./form-validar-login.component.css'],
  providers: [ValidarLoginService, MessageService]
})
export class FormValidarLoginComponent implements OnInit {


  constructor(private validarLoginService: ValidarLoginService,
              private router: Router,
              private tokenAccesoService: TokenAccesoService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.validarLoginService.rptaTokenUsuario$.subscribe( ( rpta : Respuesta<TokenUsuario> ) => {

      if ( rpta == null ) {
        return;
      }

      if ( rpta.estado == Estado.SUCCESS ) {
        this.tokenAccesoService.guardarTokenSession(rpta.data.token);
        this.router.navigate(['../tipos-cambio'], { relativeTo: this.activatedRoute });
      }

      if ( rpta.estado == Estado.ERROR || rpta.estado == Estado.WARNING ) {
        this.messageService.clear();
        this.messageService.add({severity:"warn", summary: 'Mensaje',
                  detail: 'Usuario o clave incorrecta'});
      }

    });

  }

  validarLogin(usuario: string, clave: string) {

    let faltaUsuario = usuario == null || usuario.trim().length <= 0;
    let faltaClave = clave == null || clave.trim().length <= 0;

    if ( faltaUsuario || faltaClave ) {
      this.messageService.add({severity:"warn", summary: 'Mensaje',
                              detail: 'Debe ingresar Usuario y clave'});
      return;
    }

    this.validarLoginService.validar(usuario, clave);
  }

}
