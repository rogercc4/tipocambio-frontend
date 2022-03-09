import { InjectionToken } from "@angular/core";
import { environment } from '../../environments/environment';


export interface AppEndpointConfig {
  tiposDeCambio: string;
  validarLogin: string;
}

export const appEndpointInternet : AppEndpointConfig = {
  tiposDeCambio: environment.urlBase + "/v1/tiposdecambio",
  validarLogin: environment.urlBase + "/validarlogin"
}

export const APP_ENDPOINT_CONFIG = new InjectionToken<AppEndpointConfig>('app-endpoint-config');
