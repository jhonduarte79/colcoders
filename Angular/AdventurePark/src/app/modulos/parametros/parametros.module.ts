import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { AtraccionesComponent } from './atracciones/atracciones.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';


@NgModule({
  declarations: [
    ClientesComponent,
    EmpleadosComponent,
    AdministracionComponent,
    AtraccionesComponent,
    RestaurantesComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
