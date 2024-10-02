import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { NamethesongComponent } from './namethesong/namethesong.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
{ path: 'ahorcado', component: AhorcadoComponent },
{ path: 'mayor-o-menor', component: MayorOMenorComponent },
{ path: 'preguntados', component: PreguntadosComponent },
{ path: 'name-the-song', component: NamethesongComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
