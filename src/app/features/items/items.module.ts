import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItemsFormComponent, ItemsListComponent } from '@registration-items-features';
import { SharedModule } from '@registration-items-shared';
import { ConfirmationService } from 'primeng/api';

import { ItemsService } from './items.service';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [ItemsListComponent, ItemsFormComponent],
  providers: [ItemsService, ConfirmationService]
})
export class ItemsModule {}
