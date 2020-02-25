import { element } from 'protractor'
import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'socket-ui',
  template: `
    <input-bar (result)="handleChange($event)"></input-bar>
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
  }

  handleChange(event) {
    console.log(event)
    this.result = event
  }
}
