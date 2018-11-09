import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  itemsList = [];
  localStorageName = 'MyLocalStorage';
  constructor() {}

  toRemove(id: any) {
    try {
      const newItems = this.itemsList.filter(e => e.id !== id);
      localStorage.setItem(this.localStorageName, JSON.stringify(newItems));
    } catch (e) {
      console.error('Erro ao salvar no localStorage', e);
    }
  }

  toSave(itemsFormGroup: FormGroup) {
    try {
      const items =
        this.itemsList && this.itemsList.length ? this.itemsList : [];
      const item = itemsFormGroup.getRawValue();
      let isEdit = false;
      items.forEach((a, i) => {
        if (a.id === item.id) {
          isEdit = true;
          items[i] = item;
        }
      });
      if (!isEdit) {
        items.push(item);
      }
      localStorage.setItem(this.localStorageName, JSON.stringify(items));
    } catch (e) {
      console.error('Erro ao salvar no localStorage', e);
    }
  }

  toViewId(id: any = '') {
    let item = [];
    if (this.itemsList && this.itemsList.length) {
      item = this.itemsList.filter(e => e.id === id);
    }
    return item[0];
  }

  toView(): any {
    try {
      this.getListLocalStorage();
      if (this.itemsList && this.itemsList.length) {
        this.itemsList.forEach(element => {
          if (element && element.dataFabricacao) {
            element.dataFabricacao = moment(element.dataFabricacao).toDate();
          }
          if (element && element.dataValidade) {
            element.dataValidade = moment(element.dataValidade).toDate();
          }
        });
      }
      return this.itemsList;
    } catch (e) {
      console.error('Erro ao obter localStorage', e);
      return [];
    }
  }

  private getListLocalStorage() {
    this.itemsList = JSON.parse(localStorage.getItem(this.localStorageName));
  }

  getLocalCalendar() {
    return {
      firstDayOfWeek: 0,
      dayNames: [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado'
      ],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ],
      monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      today: 'Hoje',
      clear: 'Limpar'
    };
  }
}
