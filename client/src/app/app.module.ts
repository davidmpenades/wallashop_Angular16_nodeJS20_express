import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home/home-routing.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ShopRoutingModule } from './shop/shop-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxBootstrapIconsModule.pick(allIcons),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
