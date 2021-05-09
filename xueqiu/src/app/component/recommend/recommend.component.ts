import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

// 导入服务
import { NewService } from 'src/app/service/new.service';

// 接口对应
const tabObj = {
  recommend: -1,
  liveNews: 6,
  hushen: 105,
  kechaung: 115,
};

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.less'],
})
export class RecommendComponent implements OnInit {
  hostList = [];
  constructor(public server: NewService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // tabObj[params.id];
      // console.log(params.key);
      // console.log(tabObj[params.key]);

      const promise = this.server.getHotList();
      promise
        .then((result) => {
          // console.log(result.items);
          this.hostList = result.items;
        })
        .catch((err) => {
          // console.log(err);
          throw err;
        });
    });
  }
}
