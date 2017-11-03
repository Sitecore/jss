import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JSS_ROUTE_DATA } from './data.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  route: any;

  constructor(
    private http: HttpClient,
    @Inject(JSS_ROUTE_DATA) private config: any
  ) { }

  ngOnInit() {
    this.route = this.config.SC_CONFIG.sitecore.route;
    console.log(this.config.SC_CONFIG);
  }
}
