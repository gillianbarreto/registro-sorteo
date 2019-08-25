import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MeetandgreetService {

  private basePath = 'https://apicoewebdeva01.azure-api.net/paratiRestApp';  // Pediente completar
  private path;

  constructor(private http: HttpClient) { }

  // Guardar Datos del Participante
  sendData(param): Observable<any> {
    this.path = '/contigo-capitan/register';
    return this.http.post(this.getUrl(this.path), param).catch(this.handleError);
  }

  // Errores
  private handleError(error: Response) {
    console.log(error);
    if (error.status === 0) {
      return Observable.throw({
        code: `${error.status}`,
        message: 'No es posible establecer comunicación con el servidor. Intente más tarde!'
      });
    } else {
      return Observable.throw({ code: `${error.status}`, message: `${error.statusText}` });
    }
  }

  // URL del servicio
  private getUrl(path) {
    return (this.basePath + path);
  }

}
