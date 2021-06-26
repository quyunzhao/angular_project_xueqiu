import { Component, OnInit } from '@angular/core';
import { NewService } from 'src/app/service/new.service';

@Component({
  selector: 'app-newstock',
  templateUrl: './newstock.component.html',
  styleUrls: ['./newstock.component.less'],
})
export class NewstockComponent implements OnInit {
  start = 0;
  limit = 10;
  logList = [];
  constructor(public server: NewService) {
    // 初始化加载
    this.getLogList();
  }

  ngOnInit(): void {}

  async getLogList(): Promise<void> {
    const options = {
      params: { limit: this.limit, skip: this.start },
    };
    const result = await this.server.getLogList(options);
    this.logList = result;
    console.log(result);
  }
}
