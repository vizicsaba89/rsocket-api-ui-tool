import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'socket-ui',
  template: `
    <div class="row">
      <div class="col s4">1</div>
      <div class="col s4">2</div>
      <div class="col s4">
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

  result: any

  constructor(private socketUIService: SocketUIService) {}

  async ngOnInit(): Promise<void> {
    this.result = await this.socketUIService.getSocketResponse({})
    console.log(this.result)
    // this.result = this.result.data
  }

}
