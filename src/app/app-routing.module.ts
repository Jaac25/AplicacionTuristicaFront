import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio', loadChildren: () => 
    import('./components/inicio/inicio.module').then(m => m.InicioModule)
  },
  {
    path: 'lugares', loadChildren: () => 
    import('./components/lugares/lugares.module').then(m => m.LugaresModule)
  },
  {
    path: 'contacto', loadChildren: () => 
    import('./components/contacto/contacto.module').then(m => m.ContactoModule)
  },
  
  {path:'',pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
