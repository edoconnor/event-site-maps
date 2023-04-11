import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailsComponent } from './details/details.component';
import { GreenwayComponent } from './greenway/greenway.component';

import { FormComponent } from './form/form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MapComponent,
    DetailsComponent,
    GreenwayComponent,

    FormComponent,
    ContactFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
