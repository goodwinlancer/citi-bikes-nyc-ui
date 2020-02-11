import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Station } from '../shared/station';
import 'rxjs/operator/map';
import { Subject } from 'rxjs';

class ExecutionTime{
  executiontime: string;
  stationBeanList:[];

}

// Will move this class definition to a separate class file later
// This is temporary provision for PoC.
class DataTablesResponse {
  message: string;
  data: [];
  hasNext: boolean;
  hasPrevious: boolean;
}

@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.scss']
})

export class SearchtableComponent implements OnDestroy, OnInit {
  isLoaded:boolean = false;
  dtOptions: DataTables.Settings = {};
  stations: Station[] = [];
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Station> = new Subject();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    //Calling the API. Will move this API call to service class later. This is temporary provision for PoC.
    this.http
    .get<DataTablesResponse>(
      'http://50.116.0.178:8080/citi-bikes-nyc/getstations/'      
      //'http://localhost:8080/citi-bikes-nyc/getstations/'      
    ).subscribe(resp => {
      this.stations = resp.data;
      // console.log("Stations List: ----------- this.stations=" + JSON.stringify(this.stations));
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
      this.isLoaded = true;
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();  
  }

}
