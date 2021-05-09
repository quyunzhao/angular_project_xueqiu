import { Component, OnInit } from '@angular/core';
import { NewService } from 'src/app/service/new.service';

@Component({
  selector: 'app-dayinfo',
  templateUrl: './dayinfo.component.html',
  styleUrls: ['./dayinfo.component.less'],
})
export class DayinfoComponent implements OnInit {
  // 7*24列表
  newsList = [];

  // 当前时间
  currentTime = new Date();

  // 时间映射
  timeObj = {
    '01': '一月',
    '02': '二月',
    '03': '三月',
    '04': '四月',
    '05': '五月',
    '06': '六月',
    '07': '七月',
    '08': '八月',
    '09': '九月',
    10: '十月',
    11: '十一月',
    12: '十二月',
  };

  constructor(public server: NewService) {}

  ngOnInit(): void {
    const promise = this.server.getNews();
    promise
      .then((result) => {
        // console.log(result.items);
        this.newsList = result.items;
      })
      .catch((err) => {
        throw err;
      });
  }
}
