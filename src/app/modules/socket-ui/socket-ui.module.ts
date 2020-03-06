import { FormsModule } from '@angular/forms'
import { InputBarModule } from './../input-bar/inpu-bar.module'
import { SocketUIService } from './services/socket-ui.service'
import { SocketUIComponent } from './components/socket-ui.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import { NgJsonEditorModule } from 'ang-jsoneditor'

@NgModule({
  declarations: [ SocketUIComponent ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    InputBarModule,
    NgJsonEditorModule
  ],
  providers: [
    SocketUIService
  ]
})
export class SocketUIModule {}
