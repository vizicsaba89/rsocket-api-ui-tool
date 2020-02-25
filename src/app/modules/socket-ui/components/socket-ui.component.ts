import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'socket-ui',
  template: `
    <input-bar (result)="handleChange($event)"></input-bar>
    <div class="row">
      <div class="col s5">
      <ngs-code-editor
        [theme]="theme"
        [codeModel]="payloadModel"
        [options]="options"
        style="height: 500px;"
        (valueChanged)="onCodeChanged($event)"
      >
      </ngs-code-editor>
      </div>
      <div class="col s5">
      <ngs-code-editor
        [theme]="theme"
        [codeModel]="resultModel"
        [options]="options"
        style="height: 500px;"
      >
      </ngs-code-editor>
      </div>
    </div>
  `,
  styleUrls: ['./socket-ui.component.scss']
})
export class SocketUIComponent implements OnInit {

  result = `{"menu": {
    "id": "file",
    "value": "File",
    "popup": {
      "menuitem": [
        {"value": "New", "onclick": "CreateNewDoc()"},
        {"value": "Open", "onclick": "OpenDoc()"},
        {"value": "Close", "onclick": "CloseDoc()"}
      ]
    }
  }}`

  theme = 'vs-dark'

  payloadModel = {
    language: 'json',
    value: '{}'
  }

  resultModel = {
    language: 'json',
    readOnly: true,
    value: this.result
  }

  options = {
    contextmenu: false,
    minimap: {
      enabled: true
    }
  }

  constructor(private socketUIService: SocketUIService) {}

  async ngOnInit(): Promise<void> {
  }

  onCodeChanged(value) {
    console.log('CODE', value)
  }

  handleChange(event) {
    this.result = event
  }

}
