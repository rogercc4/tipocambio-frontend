import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Moneda} from '../model/moneda.model'

import { EMPTY, Observable } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {

  private mapCache : Map<string, Observable<Moneda[]>> = new Map();

  constructor(private http: HttpClient) { }

  loadMonedas() : Observable<Moneda[]> {

    let rutaJson:string = "assets/json/monedas.json"

    let observableInCache = this.mapCache.get(rutaJson);

    if ( observableInCache ) {
      return observableInCache;
    }

    observableInCache = this.http.get<any[]>(rutaJson).pipe(
          map(res => {
              if ( res == null ) {
                return null;
              }

              let respuesta : Moneda[] = new Array();

              res.forEach(itemRes => {
                let objDatCat = new Moneda();
                objDatCat.codigo =  itemRes.AlphabeticCode;
                objDatCat.nombre =  itemRes.Currency;
                objDatCat.pais =  itemRes.Entity;
                respuesta.push(objDatCat);
              });

              return respuesta;
          }),
          shareReplay({ bufferSize: 1, refCount: true }),
          catchError(err => {
            this.mapCache.delete(rutaJson);
            return EMPTY;
          })
        );

    this.mapCache.set(rutaJson, observableInCache);

    return observableInCache;
  }

}
