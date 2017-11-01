import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './main/app-routing.module';
import { AppComponent } from './main/app.component';

import {UiModule} from '../ui/ui.module';
import { MiddleComponent } from './main/middle/middle.component';
import { FooterComponent } from './main/footer/footer.component';
import { HomeComponent } from './main/home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    MiddleComponent,
    FooterComponent,
    HomeComponent

    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AppRoutingModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
