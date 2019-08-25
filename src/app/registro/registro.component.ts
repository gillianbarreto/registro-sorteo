import { Component, OnInit } from '@angular/core';
import { MeetandgreetService } from '../shared/services/meetandgreet.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [MeetandgreetService]
})
export class RegistroComponent implements OnInit {

  public data;
  public registred: boolean;
  public spinner: boolean;
  public documentPattern: string;
  public documentError: string;
  public classAlert: string;
  public messageAlert = '';

  constructor(private meetandgreet: MeetandgreetService) { }

  ngOnInit() {
    this.spinner = false;
    this.changePattern('DNI');
    this.data = this.initData();
    this.registred = false;
  }

  initData() {
    return {
      nombres: '',
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      telefono: '',
      correo: ''
    };
  }

  // Cambiar Pattern según el valor seleccionado en Tipo de Documento
  changePattern(value: string) {
    if (value === 'DNI') {
      this.documentPattern = '[0-9]{8}';
      this.documentError = 'Tu documento debe tener 8 dígitos';
    } else if (value === 'CARNET_EXTRANJERIA') {
      this.documentPattern = '[0-9]{9,12}';
      this.documentError = 'Tu documento debe tener entre 9 y 12 dígitos';
    } else {  // Pasaporte
      this.documentPattern = '[0-9A-B]{6,12}';
      this.documentError = 'Tu documento puede tener máximo 12 dígitos';
    }
  }

  // Guarda Datos
  sendData(form) {
    if (!form.valid) { return; }
    const name = form.value.nombres;
    let firstName = name;
    if (firstName.indexOf(' ') >= 0) {
      firstName = name.split(' ').slice(0, 1).join(' ');
    }
    // Muestra icon spinner en boton Guardar
    this.spinner = true;
    const param = {
      'completeName': form.value.nombres,
      'documentType': form.value.tipoDocumento,
      'documentNumber': form.value.numeroDocumento,
      'phoneNumber': form.value.telefono,
      'email': form.value.correo
    }
    this.meetandgreet.sendData(param).subscribe(
      data => {
        console.log(data);
        this.spinner = false;
        // Ya está registrado el Tipo y Número de Documento
        if (data.error.code === 100) {
          this.showMessage('success', `Hola ${firstName} ya tenemos tus datos. Pronto te avísaremos si eres uno de los Hinchas ganadores!`);
          // Validación tipo de Documento
        } else if (data.error.code === 101) {
          this.showMessage('warning', `${firstName} el número de documento que has indicado no corresponde con el tipo seleccionado`);
        } else if (data.error.code === 102) {
          this.showMessage('warning', `${firstName},  el correo que has indicado no tiene un formato correcto`);
          // Muestra pantalla de confirmacion
        } else {
          this.showAnswer();
        }
      },
      error => {
        this.spinner = false;
        this.showMessage('danger', `Disculpa ${firstName}, el servicio no está disponible ahora. Por favor, intenta más tarde!`);
      }
    );

  }

  // Mensaje de error
  showMessage(c: string, t: string) {
    this.classAlert = 'alert-' + c;
    this.messageAlert = t;
    setTimeout(() => {
      this.messageAlert = '';
    }, 5000);
  }

  // Muestra confirmacion de registro
  showAnswer() {
    this.registred = true;
    // Cambia Fondo
    const element = document.getElementById('cover');
    element.classList.add('cover-respuesta');
    element.classList.remove('cover-premios');
    element.classList.remove('cover-home');
    element.classList.remove('cover-registro');
  }

}
