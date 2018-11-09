import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormatUtilsService } from '@registration-items-shared';
import { ConfirmationService, Message } from 'primeng/api';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  listItems = [];
  msgGrowl: Message[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private itemsService: ItemsService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.getListItems();
  }

  getListItems() {
    this.listItems = this.itemsService.toView();
  }

  getCurrency(amount: number) {
    return this.currencyPipe.transform(amount, 'BRL', true, '1.2-2');
  }

  getConvertBoolean(perecivel: any) {
    return perecivel === true ? 'Sim' : 'Não';
  }

  removerItem(item: any) {
    this.confirmationService.confirm({
      message: 'Remover este item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      header: 'Confirmação',
      accept: () => {
        this.itemsService.toRemove(item.id);
        this.getListItems();
        this.msgGrowl = [];
        this.msgGrowl.push({
          severity: 'success',
          detail: 'Item removido com sucesso!'
        });
      }
    });
  }

  editarItem(item: any) {
    this.router.navigate(['/edit', item.id]);
  }

  novo() {
    this.router.navigate(['/add']);
  }

  getDateBr(date: any) {
    return FormatUtilsService.getDateFormatBr(date);
  }
}
