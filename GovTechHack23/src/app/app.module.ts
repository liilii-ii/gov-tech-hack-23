import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MissionComponent } from './mission/mission.component';
import { MapComponent } from './map/map.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MapViewComponent } from './map-view/map-view.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { StateDialogComponent } from './state-dialog/state-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    MissionComponent,
    MapComponent,
    MapViewComponent,
    StateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
