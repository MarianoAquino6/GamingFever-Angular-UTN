import { RegistroComponent } from './componentes/registro/registro.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponentComponent } from './componentes/home-component/home-component.component';
import { LoginComponentComponent } from './componentes/login-component/login-component.component';
import { QuienSoyComponentComponent } from './componentes/quien-soy-component/quien-soy-component.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponentComponent },
    { path: 'login', component: LoginComponentComponent },
    { path: 'quien-soy', component: QuienSoyComponentComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'encuesta',component: EncuestaComponent },
    {
        path: 'juegos',
        loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule)
    },


    { path: '**', component: PageNotFoundComponent }
];