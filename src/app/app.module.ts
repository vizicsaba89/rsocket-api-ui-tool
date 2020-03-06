import { SocketUIModule } from './modules/socket-ui/socket-ui.module'
import { SocketUIComponent } from './modules/socket-ui/components/socket-ui.component'
import { RouterModule, Routes } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgJsonEditorModule } from 'ang-jsoneditor' 

const routes: Routes = [
  { path: '', component: SocketUIComponent }
]
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketUIModule,
    RouterModule.forChild(routes),
    NgJsonEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
