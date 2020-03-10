import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor'

@Component({
  selector: 'socket-ui',
  template: `
    <input-bar (result)="handleSubmit($event)" [payload]="finalPayload"></input-bar>

    <div class="row">
      <div class="col s6">
        <label for="payload" class="white-text">Message</label>
        <json-editor id="payload" [options]="editorOptions" [data]="payload" [(ngModel)]="finalPayload"></json-editor>
      </div>
  
      <div class="col s6" style="height: 700px;">
        <label for="result" class="white-text">Result</label>
        <json-editor id="result" [options]="editorOptions" [data]="result"></json-editor>
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

  payload: any = {}
  finalPayload: any = {}

  constructor(private socketUIService: SocketUIService) {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view']
    this.editorOptions.mode = 'code'
    this.editorOptions.mainMenuBar = false
    this.editorOptions.statusBar = false
  }

  async ngOnInit(): Promise<void> {
  }

  handleSubmit(event) {
    this.result = event
  }

}
