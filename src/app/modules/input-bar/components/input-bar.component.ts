import { SocketUIService } from './../../socket-ui/services/socket-ui.service'
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'input-bar',
  template: `
    <div class="row">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="input-field col s2">
          <select formControlName="interactionModel">
            <option value="" disabled selected>Choose interaction model</option>
            <option value="1">Request-Response</option>
            <option value="2">Request-Stream</option>
            <option value="3">Channel</option>
            <option value="4">Fire-and-Forget</option>
          </select>
          <label>Interaction Models</label>
        </div>
        <div class="input-field col s4">
          <input formControlName="wsBaseUrl" placeholder="websocket base url" type="text" class="validate">
          <label for="wsBaseUrl">Websocket URL</label>
        </div>
        <div class="input-field col s4">
          <input formControlName="destinationUrl" placeholder="websocket destination" type="text" class="validate">
          <label for="destinationUrl">Destination</label>
        </div>
        <div class="input-field col s2">
          <button type=submit class="waves-effect waves-light btn">send</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./input-bar.component.scss']
})
export class InputBarComponent implements OnInit {

  form: FormGroup

  wsBaseUrl = new FormControl("", Validators.required)
  destinationUrl=  new FormControl("", Validators.required)
  interactionModel =  new FormControl("", Validators.required)

  @Output()
  result = new EventEmitter()

  elements: any[] = []

  constructor(private fb: FormBuilder, private socketUIService: SocketUIService) {
    this.form = fb.group({
      "wsBaseUrl": this.wsBaseUrl,
      "destinationUrl": this.destinationUrl,
      "interactionModel": this.interactionModel,
    })
  }

  async ngOnInit(): Promise<void> {
  }

  async onSubmit() {
    const response = await this.socketUIService.getSocketResponse({
      destinationUrl: this.form.value.destinationUrl,
      interactionModel: this.form.value.interactionModel,
      payload: undefined, 
      wsBaseUrl: this.form.value.wsBaseUrl
    })

    response.subscribe({
      onComplete: () => {
        this.result.emit(this.elements)
      },
      onError: error => {
        console.log(error);
        this.elements = []
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
