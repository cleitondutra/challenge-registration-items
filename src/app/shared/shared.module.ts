import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    FieldsetModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    KeyFilterModule,
    CurrencyMaskModule,
    ConfirmDialogModule,
    CalendarModule,
    CommonModule,
    SplitButtonModule,
    PanelModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    MenuModule,
    TableModule
  ],
  providers: []
})
export class SharedModule {}
