import { Component, OnInit } from '@angular/core';
import { JssService } from './jss.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  route: any;

  constructor(
    private jssService: JssService
  ) { }

  ngOnInit() {
    const jssState = this.jssService.getRouteData('/');
    this.route = jssState.sitecore.route;
    console.log(jssState);
  }
}
