import { InputBarModule } from './../input-bar/inpu-bar.module'
import { SocketUIService } from './services/socket-ui.service'
import { SocketUIComponent } from './components/socket-ui.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import { CodeEditorModule } from '@ngstack/code-editor'

@NgModule({
  declarations: [ SocketUIComponent ],
  imports: [CommonModule, HttpClientModule, InputBarModule, CodeEditorModule],
  providers: [
    SocketUIService
  ]
})
export class SocketUIModule {}
