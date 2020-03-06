import { SocketUIService } from './../../socket-ui/services/socket-ui.service'
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'input-bar',
  template: `
    <div style="margin: 10px;" class="row card-panel grey darken-4 z-depth-1">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="col s1">
          <img src="assets/rsocket.png" alt="" class="circle responsive-img">
        </div>
        <div class="input-field col s2">
          <select formControlName="interactionModel">
            <option value="" disabled selected>Choose interaction model</option>
            <option value="Request-Response">Request-Response</option>
            <option value="Request-Stream">Request-Stream</option>
            <option value="Channel">Channel</option>
            <option value="Fire-and-Forget">Fire-and-Forget</option>
          </select>
          <label>Interaction Models</label>
        </div>
        <div class="input-field col s3">
          <input formControlName="wsBaseUrl" placeholder="" type="text" class="white-text">
          <label for="wsBaseUrl">Websocket URL</label>
        </div>
        <div class="input-field col s5">
          <input formControlName="destinationUrl" placeholder="" type="text" class="white-text">
          <label for="destinationUrl">Destination</label>
        </div>
        <div class="input-field col s1">
          <button type=submit class="waves-effect pink accent-4 btn" style="margin: 10px;">send</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./input-bar.component.scss']
})
export class InputBarComponent {

  form: FormGroup

  wsBaseUrl = new FormControl("ws://localhost/rsocket", Validators.required)
  destinationUrl=  new FormControl("working.time.abc-1234.2020-01-31T23:59:59.2020-02-31T23:59:59", Validators.required)
  interactionModel =  new FormControl("", Validators.required)

  @Output()
  result = new EventEmitter()

  elements: any[] = []

  constructor(private fb: FormBuilder, private socketUIService: SocketUIService) {
    this.form = this.fb.group({
      "wsBaseUrl": this.wsBaseUrl,
      "destinationUrl": this.destinationUrl,
      "interactionModel": this.interactionModel,
    })
  }

  async onSubmit() {
    const response = await this.socketUIService.getSocketResponse({
      destinationUrl: this.form.value.destinationUrl,
      interactionModel: this.form.value.interactionModel,
      payload: undefined, 
      wsBaseUrl: this.form.value.wsBaseUrl
    }).catch(error => {
      this.elements = []
      this.elements.push( { error: `${error}` })
      this.result.emit(this.elements)
    })

    response.subscribe({
      onComplete: () => {
        this.result.emit(this.elements)
      },
      onError: error => {
        console.log('error: ', error);
        this.elements = []
        this.elements.push( { error: `${error}` })
        this.result.emit(this.elements)
      },
      onNext: payload => {
        this.elements.push(payload.data)
      },
      onSubscribe: subscription => {
        this.elements = []
        subscription.request(2147483647);
      },
    })
  }

}
