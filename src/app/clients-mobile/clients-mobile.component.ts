import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-mobile',
  templateUrl: './clients-mobile.component.html',
  styleUrls: ['./clients-mobile.component.css']
})
export class ClientsMobileComponent implements OnInit {

  imagens = [
    { path: '/assets/img/clientes/garden_santista.jpeg' },
    { path: '/assets/img/clientes/gaucho_grill.jpeg' },
    { path: '/assets/img/clientes/grafica_art_top.jpeg' },
    { path: '/assets/img/clientes/obrasileiro_marmitex.jpeg' },
    { path: '/assets/img/clientes/platform_builders.jpeg' },
    { path: '/assets/img/clientes/sigas.jpeg', width: '90%' },
  ]

  constructor() { }

  ngOnInit(): void {
  }



}
