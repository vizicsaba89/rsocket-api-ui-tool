import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor'

@Component({
  selector: 'socket-ui',
  template: `
    <input-bar (result)="handleChange($event)"></input-bar>

    <div class="row">
      <div class="col s6">
        <label for="payload" class="white-text">Message</label>
        <json-editor id="payload" [options]="editorOptions" [data]="payload"></json-editor>
      </div>
      <label for="result" class="white-text">Result</label>
  
      <div id="result" class="col s6 grey darken-4" style="height: 800px; overflow-y: scroll;">
        <pre class="white-text" style="font-size: 10px;">{{ result | json }}</pre>
      </div>
    </div>
  `,
  styleUrls: ['./socket-ui.component.scss']
})
export class SocketUIComponent implements OnInit {

  result: any = undefined

  public editorOptions: JsonEditorOptions

  @ViewChild(JsonEditorComponent, { static: true })
  editor: JsonEditorComponent

  payload: any

  constructor(private socketUIService: SocketUIService) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']
    this.editorOptions.mode = 'code'
    this.editorOptions.mainMenuBar = false
    this.editorOptions.theme = 0
  }

  async ngOnInit(): Promise<void> {
  }
  
  handleChange(event) {
    this.result = event
  }

}
