import { element } from 'protractor'
import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'socket-ui',
  template: `
    <input-bar></input-bar>
    <div class="row">
      <div class="col s2">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <p>history</p>
          </div>
        </div>
      </div>
      <div class="col s5">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <p>payload</p>
          </div>
        </div>
      </div>
      <div class="col s5">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <pre><code>{{ result | json }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./socket-ui.component.scss']
})
export class SocketUIComponent implements OnInit {

  result: any[] = []

  constructor(private socketUIService: SocketUIService) {}

  async ngOnInit(): Promise<void> {
    const response = await this.socketUIService.getSocketResponse({})
    
    response.subscribe({
      onComplete: () => console.log('complete'),
      onError: error => {
        console.log(error);
        console.log("Connection has been closed due to ");
      },
      onNext: payload => {
        console.log(payload.data);
        this.result.push(payload.data)
      },
      onSubscribe: subscription => {
        subscription.request(2147483647);
      },
    });
  }

}
