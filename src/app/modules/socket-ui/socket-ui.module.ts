import { AceEditorModule } from 'ng2-ace-editor'
import { InputBarModule } from './../input-bar/inpu-bar.module'
import { SocketUIService } from './services/socket-ui.service'
import { SocketUIComponent } from './components/socket-ui.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ SocketUIComponent ],
  imports: [CommonModule, HttpClientModule, InputBarModule, FormsModule, AceEditorModule,],
  providers: [
    SocketUIService
  ]
})
export class SocketUIModule {}
