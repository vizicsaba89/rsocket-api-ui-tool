import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'input-bar',
  template: `
    <div class="row">
      <div class="input-field col s2">
        <select>
          <option value="" disabled selected>Choose interaction model</option>
          <option value="1">Request-Response</option>
          <option value="2">Request-Stream</option>
          <option value="3">Channel</option>
          <option value="4">Fire-and-Forget</option>
        </select>
        <label>Interaction Models</label>
      </div>
      <div class="input-field col s10">
        <input placeholder="ws://{url}" type="text" class="validate">
        <label for="first_name">Websocket URL</label>
      </div>
    </div>
  `,
  styleUrls: ['./input-bar.component.scss']
})
export class InputBarComponent implements OnInit {

  constructor() {}

  async ngOnInit(): Promise<void> {
  }

}
