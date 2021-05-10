import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { DraggableDirective } from './directives/draggable.directive';
import { ZoomableDirective } from './directives/zoomable.directive';
import { NodeVisualComponent } from './node-visual/node-visual.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    DraggableDirective,
    ZoomableDirective,
    NodeVisualComponent,
    LinkVisualComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
