import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@registration-items-shared/shared.module';
import { SideBarComponent } from './side-bar.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [SideBarComponent],
  declarations: [SideBarComponent],
  providers: []
})
export class SideBarModule {}
