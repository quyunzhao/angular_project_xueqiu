import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'xueqiu';
  constructor(private appService: AppService) {}

  showConfig(): void {
    this.appService.getConfig().subscribe((data: Config) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.showConfig();
  }
}
