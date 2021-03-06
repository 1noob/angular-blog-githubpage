import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import {ArticleComponent} from "./article/article.component";

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'articles/:articleName', component: ArticleComponent },
  { path: '**', redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
