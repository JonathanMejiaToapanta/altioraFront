import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  navLinks = [
    {
      label: 'Clientes',
      link: './clients',
      index: 0,
      visible: true,
    },
    {
      label: 'Productos',
      link: './products',
      index: 1,
      visible: true,
    },
    {
      label: 'Ordenes',
      link: './orders',
      index: 2,
      visible: true,
    },
  ];


  constructor() { }

  ngOnInit() {
  }

}
