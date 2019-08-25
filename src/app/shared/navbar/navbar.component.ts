import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  registro = false;
  premios = false;
  terminos = false;

  constructor() { }

  ngOnInit() { }

  addActive(n) {
    // Cambiar clase active
    this.registro = (n === 0);
    this.premios = (n === 1);
    this.terminos = (n === 2);
    // Cambia fondo
    const element = document.getElementById('cover');
    switch (n) {
      case 0:
        element.classList.add('cover-registro');
        element.classList.remove('cover-premios');
        element.classList.remove('cover-home');
        element.classList.remove('cover-respuesta');
        break;
      case 1:
        element.classList.add('cover-premios');
        element.classList.remove('cover-registro');
        element.classList.remove('cover-home');
        element.classList.remove('cover-respuesta');
        break;
      case 2:
        // queda el fondo actual
        break;
      default:
        element.classList.add('cover-home');
        element.classList.remove('cover-premios');
        element.classList.remove('cover-registro');
        element.classList.remove('cover-respuesta');
    }
  }

}
