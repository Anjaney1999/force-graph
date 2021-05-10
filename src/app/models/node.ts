export class Node implements d3.SimulationNodeDatum {
    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
  
    id: string;
    linkCount: number = 0;
  
    constructor(id) {
      this.id = id;
    }
  
    normal = () => {
      return Math.sqrt(this.linkCount / 100);
    }
  
    get r() {
      return 50 * this.normal() + 10;
    }
  
    get fontSize() {
      return (30 * this.normal() + 10) + 'px';
    }
  }