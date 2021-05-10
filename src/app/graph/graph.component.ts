import { AfterContentChecked, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ForceDirectedGraph,Node,Link } from '../models';
import { D3Service } from '../services/d3.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  graph: ForceDirectedGraph;
  nodes: Node[];
  links: Link[];
  interval!: Subscription;
  refresh!: boolean;
  public _options: { width, height } = { width: 1500, height: 500 };

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.graph.initSimulation(this._options);
  }


  constructor(private d3Service: D3Service, private dataService: DataService, private ref: ChangeDetectorRef) {
    this.nodes = []
    this.links = []
  }
  // ngAfterContentChecked(): void {
  //   this.ref.markForCheck();
  // }

  ngOnInit() {
    if(this.interval) {
      this.interval.unsubscribe();
    }
    this.refresh = false;
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this._options);
    this.graph.ticker.subscribe((d) => {
      this.ref.markForCheck();
    });
    this.interval = interval(2000).subscribe(x => {
      this.draw();
    })
  }

  draw() {
    this.dataService.getData('data').subscribe((data: any) => {
      console.log('pulled data');
      this.refresh = false;
      const oldNodes = new Map(this.nodes.map(d => [d.id, d]));
      if(oldNodes.size != data.nodes.length) {
        this.refresh = true;
      }
      for(const n of data.nodes) {
        if(!oldNodes.has(n.id)) {
          this.refresh = true;
        }
      }
      this.nodes = data.nodes;
      this.links = data.links;

      this.nodes = this.nodes.map((d: Node) => {
        return Object.assign(oldNodes.get(d.id) || {}, d);
      })
      this.graph.nodes = this.nodes;
      this.graph.links = this.links;
      this.graph.initNodes();
      this.graph.initLinks();

      if(this.refresh) {
        this.graph.simulation.alpha(0.4).restart()
        this.refresh = false;
      }
    })
  }

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}
