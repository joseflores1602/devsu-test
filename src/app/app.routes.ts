import { Routes } from '@angular/router';
import { ListaComponent } from './producto/lista/lista.component';
import { NuevoComponent } from './producto/nuevo/nuevo.component';
import { EditarComponent } from './producto/editar/editar.component';
import { NotFoundComponent } from './pagina/not-found/not-found.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'lista',
    pathMatch: 'full'
},
{
    path: 'lista',
    component: ListaComponent
},
{
    path: 'nuevo',
    component: NuevoComponent
},
{
    path: 'editar/:id',
    component: EditarComponent
},
{
    path: '**',
    component: NotFoundComponent
}];
