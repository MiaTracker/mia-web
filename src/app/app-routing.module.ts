import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {DetailsPageComponent} from "./pages/details-page/details-page.component";

const routes: Routes = [
  { path: '', component: IndexPageComponent },
  { path: 'movie/:id', component: DetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
