import { InputBarComponent } from './components/input-bar.component'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ InputBarComponent ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [InputBarComponent],
  providers: []
})
export class InputBarModule {}
