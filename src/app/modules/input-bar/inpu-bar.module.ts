import { InputBarComponent } from './components/input-bar.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ InputBarComponent ],
  imports: [CommonModule, HttpClientModule],
  exports: [InputBarComponent],
  providers: []
})
export class InputBarModule {}
