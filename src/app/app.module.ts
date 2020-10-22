import { SalaEquipamentoComponent } from './components/sala-equipamento/sala-equipamento.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppTopbarComponent } from './components/topbar/app.topbar.component';
import { AppFooterComponent } from './components/footer/app.footer.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { PageNotificationModule, BreadcrumbModule, MenuModule, ErrorStackModule } from '@nuvem/primeng-components';
import { SecurityModule, VersionTagModule } from '@nuvem/angular-base';
import { DiarioErrosComponent } from './components/diario-erros/diario-erros.component';
import { BlockUIModule } from 'ng-block-ui';
import {TableModule} from 'primeng/table';
import {MenubarModule} from 'primeng/menubar';
import {SalaComponent} from './components/sala/sala.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import { ClienteComponent } from './components/cliente/cliente.component';
import { EquipamentoComponent } from './components/equipamento/equipamento.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';

@NgModule({
    declarations: [
        AppComponent,
        AppTopbarComponent,
        AppFooterComponent,
        DiarioErrosComponent,
        SalaComponent,
        ClienteComponent,
        EquipamentoComponent,
        ReservaComponent,
        SalaEquipamentoComponent    
        
    ],
    imports: [
        BlockUIModule.forRoot({
            message: "Carregando..."
          }),
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        PageNotificationModule,
        BreadcrumbModule,
        ErrorStackModule,
        VersionTagModule,
        SecurityModule.forRoot(environment.auth),
        MenuModule,
        PanelMenuModule,
        TableModule,
        MenubarModule,
        PanelModule,
        DialogModule,
        InputTextModule,
        ButtonModule,
        AccordionModule,
        MessagesModule,
        MessageModule,
        ToastModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        InputNumberModule,
        InputMaskModule
        
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }, 
        MessageService, ConfirmationService, DialogService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
