import { element } from 'protractor'
import { SocketUIService } from './../services/socket-ui.service'
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'socket-ui',
  template: `
    <input-bar (result)="handleChange($event)"></input-bar>
    <div class="row">
      <div class="col s5">
        <ace-editor
          [(text)]="text" 
          [mode]="'javascript'"
          [options]="editorOptions"
          #editor
          style="min-height: 540px; width:100%; overflow: auto;"></ace-editor>
      </div>
      <div class="col s7">
        <div style="height: 540px;" class="card blue-grey darken-4">
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

  @ViewChild('editor', {static: false})
  editor

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}'

  text:string = ""
  result: any[] = []

  constructor(private socketUIService: SocketUIService) {}

  async ngOnInit(): Promise<void> {
  }

  ngAfterViewInit() {
    this.editor.setTheme("vs-dark");
    this.editor.setMode("javascript");
    this.editor.getEditor().setOptions({
        enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
        name: "showOtherCompletions",
        bindKey: "Ctrl-.",
        exec: function (editor) {

        }
    })
}
  handleChange(event) {
    this.result = event
  }

}
