import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchtableComponent } from './searchtable/searchtable.component';
import { map } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    SearchtableComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: SearchtableComponent},
      

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
