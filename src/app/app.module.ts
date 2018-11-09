import { CurrencyPipe, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemsModule } from '@registration-items-features/items/items.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundModule } from '@registration-items-components/page-not-found';
import { SideBarModule } from '@registration-items-components/side-bar/side-bar.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ItemsModule,
    SideBarModule,
    PageNotFoundModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
