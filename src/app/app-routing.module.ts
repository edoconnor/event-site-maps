import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { DetailsComponent } from './details/details.component';
import { GreenwayComponent } from './greenway/greenway.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  { path: '', component: MapComponent },
  { path: 'map', component: MapComponent },
  { path: 'contact', component: ContactFormComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'form', component: ContactFormComponent },
  { path: 'greenway', component: GreenwayComponent },
  { path: '**', redirectTo: 'map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
