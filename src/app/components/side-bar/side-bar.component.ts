import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  constructor(private router: Router) {}

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Lista de Itens',
            icon: 'pi pi-fw pi-list',
            command: onclick => this.navigateList()
          },
          {
            label: 'Cadastro de Itens',
            icon: 'pi pi-fw pi-plus',
            command: onclick => this.navigateForm()
          }
        ]
      }
    ];
  }

  navigateList() {
    this.router.navigate(['/list']);
  }

  navigateForm() {
    this.router.navigate(['/add']);
  }
}
