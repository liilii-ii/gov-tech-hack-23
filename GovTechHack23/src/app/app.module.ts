import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { MapComponent } from './map/map.component';
import {MatIconModule} from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MapViewComponent } from './map-view/map-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    MapComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
MatButtonModule,
MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
