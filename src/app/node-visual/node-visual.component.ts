import { Component, Input } from '@angular/core';
import { Node } from '../models/node';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.id]="node.id" [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          class="node"
          fill="green"
          cx="0"
          cy="0"
          [attr.r]="10">
      </svg:circle>
      <svg:text
          class="node-name"
          font-size="10"> HELLO
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}