import { SocketUIService } from './services/socket-ui.service'
import { SocketUIComponent } from './components/socket-ui.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import {PrettyJsonModule} from 'angular2-prettyjson'

@NgModule({
  declarations: [ SocketUIComponent ],
  imports: [CommonModule, HttpClientModule, PrettyJsonModule],
  providers: [
    SocketUIService
  ]
})
export class SocketUIModule {}
