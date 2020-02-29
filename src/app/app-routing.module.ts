import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CreateDataComponent } from './create-data/create-data.component';


const routes: Routes = [ 
  { path: '', component: HeaderComponent},
  {path: 'admin', component: CreateDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
