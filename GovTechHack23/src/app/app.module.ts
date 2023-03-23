import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { MapComponent } from './map/map.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
