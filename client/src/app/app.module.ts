import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ShopRoutingModule } from './shop/shop-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DetailProductModule } from './detail-product/detail-product.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeRoutingModule,
    ShopRoutingModule,
    DetailProductModule,
    SharedModule,
    NgxBootstrapIconsModule.pick(allIcons),
    HttpClientModule,  
    ReactiveFormsModule,
    FormsModule,
    ToastNoAnimationModule.forRoot(),
    AuthModule,
    CoreModule,
    ProfileModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
