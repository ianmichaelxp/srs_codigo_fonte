import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { LoginSuccessComponent } from '@nuvem/angular-base';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EquipamentoComponent } from './components/equipamento/equipamento.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { SalaComponent } from './components/sala/sala.component';

const routes: Routes = [
    { path: 'diario-erros', component: DiarioErrosComponent, data: { breadcrumb: 'Diário de Erros'} },
    { path: 'login-success', component: LoginSuccessComponent },
    { path: 'clientes', component: ClienteComponent, data: { breadcrumb: 'Clientes'}},
    { path: 'equipamentos', component: EquipamentoComponent, data: { breadcrumb: 'Equipamentos'}},
    { path: 'reservas', component: ReservaComponent, data: { breadcrumb: 'Reservas'}},
    { path: 'salas', component: SalaComponent, data: { breadcrumb: 'Salas'}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
