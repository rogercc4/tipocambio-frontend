import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ToastModule} from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '../app/core/core.module';

import { APP_ENDPOINT_CONFIG, appEndpointInternet } from './utils/app-endpoint-config';
import { FormValidarLoginComponent } from './components/form-validar-login/form-validar-login.component';
import { FormTiposCambioComponent } from './components/form-tipos-cambio/form-tipos-cambio.component';

@NgModule({
  declarations: [
    AppComponent,
    FormValidarLoginComponent,
    FormTiposCambioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    AutoCompleteModule,
    KeyFilterModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    ProgressSpinnerModule
  ],
  providers: [
    {
      provide: APP_ENDPOINT_CONFIG,
      useValue: appEndpointInternet
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
