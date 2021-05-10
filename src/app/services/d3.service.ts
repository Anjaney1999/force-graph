import { Injectable, EventEmitter } from '@angular/core';
import { Node, Link, ForceDirectedGraph } from '../models';
import * as d3 from 'd3';
import { drag } from 'd3';

@Injectable({providedIn: 'root'})
export class D3Service {

  constructor() { }

  applyZoomableBehaviour(svgElement, containerElement) {
    let svg, container, zoomed, zoom;

    svg = d3.select(svgElement);
    container = d3.select(containerElement);

    zoomed = (event) => {
      const transform = event.transform;
      container.attr('transform', 'translate(' + transform.x + ',' + transform.y + ') scale(' + transform.k + ')');
    }

    zoom = d3.zoom().on('zoom', zoomed);
    svg.call(zoom);
  }

  applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
    const d3element = d3.select(element);
    
    function started(event) {
      var x = d3.select(element)
      console.log(x)
      event.sourceEvent.stopPropagation();
      if (!event.active) {
        graph.simulation.alphaTarget(0.3).restart();
      }
      node.fx = node.x
      node.fy = node.y
    }  

    function dragged(event) {
      node.fx = event.x;
      node.fy = event.y;
    }

    function ended(event) {
      if (!event.active) {
        graph.simulation.alphaTarget(0);
      }

      node.fx = null;
      node.fy = null;
    }

    const dragHandler = d3.drag()
      .on('start', started)
      .on('drag', dragged)
      .on('end', ended)

    dragHandler(d3element)  
  }

  getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height }) {
    const sg = new ForceDirectedGraph(nodes, links, options);
    return sg;
  }
}