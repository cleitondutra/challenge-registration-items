import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import * as moment from 'moment';
import { Message } from 'primeng/api';

import { ItemsService } from '../items.service';

interface UnidadeMedidaInterface {
  name: string;
  code: string;
}

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss']
})
export class ItemsFormComponent implements OnInit {
  somenteNumeroRegex: RegExp = /[]/;
  numeroRealRegx: RegExp = /^(?:[1-9](?:[\d]{0,2}(?:\.[\d]{3})*|[\d]+)|0)(?:,[\d]{0,2})?$/;
  itemsFormGroup: FormGroup;
  unidadeMedida: UnidadeMedidaInterface[];
  selectedUnidadeMedida: UnidadeMedidaInterface;
  addon: any;
  quantidadeMaxLength: any;
  pt: any;
  id: any;
  msgGrowl: Message[] = [];
  msgItemVencido: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private itemsService: ItemsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createFormGroup();
    this.getItemsData();
  }

  createFormGroup() {
    this.itemsFormGroup = this.formBuilder.group({
      id: this.formBuilder.control({ value: '', disabled: false }),
      nomeItem: this.formBuilder.control(
        { value: '', disabled: false },
        Validators.required
      ),
      unidadeMedida: this.formBuilder.control(
        { value: '', disabled: false },
        Validators.required
      ),
      quantidade: this.formBuilder.control({ value: '', disabled: false }),
      preco: this.formBuilder.control(
        { value: '', disabled: false },
        Validators.required
      ),
      perecivel: this.formBuilder.control({ value: false, disabled: false }),
      dataValidade: this.formBuilder.control({ value: null, disabled: false }),
      dataFabricacao: this.formBuilder.control(
        { value: null, disabled: false },
        Validators.required
      )
    });
  }

  getItemsData() {
    this.pt = this.itemsService.getLocalCalendar();
    this.unidadeMedida = [
      { name: 'Litro', code: 'lt' },
      { name: 'Quilograma', code: 'kg' },
      { name: 'Unidade', code: 'un' }
    ];
    const id = this.activatedRoute.snapshot.params.id;
    if (id) {
      const item = this.itemsService.toViewId(id);
      this.itemsFormGroup.patchValue(item);
      this.selectedUnidadeMedida = item.unidadeMedida;
      this.validaUnidadeMedida(
        (item.unidadeMedida && item.unidadeMedida.code) || ''
      );
      this.isItemVencido();
    } else {
      this.itemsFormGroup.get('id').setValue(UUID.UUID());
    }
  }

  changeUnidadeMedida(unidade: any) {
    this.validaUnidadeMedida(unidade);
    this.itemsFormGroup.get('quantidade').setValue('');
  }

  /**
   * @param unidade enum
   * @description Regra da unidade de medida:
   *  1- Campos com unidade de medida em litro deve permitir somente números,
   *  com até 3 casas decimais e apresentar a abreviatura “lt” ao final do campo (addon);
   *  2- Campos com unidade de medida em Quilograma deve permitir somente números, com até 3 casas decimais e
   *  apresentar a abreviatura “kg” ao final do campo (addon);
   *  3- Campos com unidade de medida em Unidade deve permitir somente
   *  números inteiros e apresentar a abreviatura “un” ao final do campo (addon);
   */
  validaUnidadeMedida(unidade: any) {
    this.addon = unidade || '';
    if (this.addon === 'lt' || this.addon === 'kg') {
      this.quantidadeMaxLength = '3';
      this.somenteNumeroRegex = /^[0-9]+$/g;
    } else if (this.addon === 'un') {
      this.somenteNumeroRegex = /[\d\-]/;
      this.quantidadeMaxLength = '';
    } else {
      this.quantidadeMaxLength = '0';
    }
  }

  /**
   * @description Garante que o campo quantidade não vai ter valores inválidos
   */
  validaQuantidadeBlur() {
    const qt = this.itemsFormGroup.get('quantidade').value || '';
    if (qt.includes('-')) {
      this.itemsFormGroup
        .get('quantidade')
        .setValue('-' + qt.replace(/-/g, ''));
    }
  }

  save() {
    this.isRequiredDataValidade(this.isPerecivel());
    if (this.itemsFormGroup.valid && this.validaDataFabricacao()) {
      this.itemsService.toSave(this.itemsFormGroup);
      this.router.navigate(['/list']);
    } else {
      this.updateAndValidateControlValues(this.itemsFormGroup);
    }
  }

  cancel() {
    this.router.navigate(['/list']);
  }

  updateAndValidateControlValues(formGroup) {
    const controls: any[] = Object.keys(formGroup['controls']);

    controls.forEach((control: any) => {
      if (control instanceof FormControl) {
        return;
      } else if (formGroup.get(control) instanceof FormGroup) {
        return this.updateAndValidateControlValues(formGroup.get(control));
      }
      formGroup.get(control).markAsDirty();
      return formGroup.get(control).updateValueAndValidity();
    });
  }

  /**
   * @param fieldName Nome do campo válido para verificar se tem erro
   * @description Método responsável por exibir a mensagem de campo obrigatório
   */
  hasEror(fieldName: string) {
    const field = this.itemsFormGroup.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * @description Só é obrigatório caso o produto seja perecível
   */
  isRequiredDataValidade(isPerecivel: boolean) {
    const dataValidade = this.itemsFormGroup.get('dataValidade');
    if (isPerecivel) {
      dataValidade.setValidators(Validators.required);
    } else {
      dataValidade.clearValidators();
    }
    dataValidade.updateValueAndValidity();
  }

  /**
   * @description Caso a data de validade seja inferior a data atual
   * deve informar que o produto encontra-se vencido.
   */
  isItemVencido() {
    const dataValidade = this.itemsFormGroup.get('dataValidade');
    if (dataValidade && dataValidade.value) {
      const dtVal = moment(dataValidade.value);
      const dataAtual = moment(new Date());
      this.msgItemVencido = [];
      if (dataAtual.isAfter(dtVal, 'date')) {
        this.msgItemVencido.push({
          severity: 'warn',
          detail: `Item vencido em ${dtVal.format('L')}`
        });
      }
    }
  }

  /**
   * @description Data não pode ser superior a data de validade
   */
  validaDataFabricacao() {
    const dataValidade = this.itemsFormGroup.get('dataValidade');
    const dataFabricacao = this.itemsFormGroup.get('dataFabricacao');
    if (
      dataValidade &&
      dataValidade.value &&
      dataFabricacao &&
      dataFabricacao.value
    ) {
      const dtFab = moment(dataFabricacao.value);
      const dtVal = moment(dataValidade.value);

      if (dtFab.isAfter(dtVal)) {
        this.msgGrowl = [];
        this.msgGrowl.push({
          severity: 'error',
          detail: 'Data de fabricação não pode ser superior a data de validade'
        });
        return false;
      }
    }
    return true;
  }

  isPerecivel() {
    return this.itemsFormGroup.get('perecivel').value;
  }
}
