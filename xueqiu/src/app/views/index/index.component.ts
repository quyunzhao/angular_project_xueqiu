import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
// 导入
import { NewService } from 'src/app/service/new.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  // 指数列表
  quoteList = [];

  // 指数列表位置
  zhishuListPosition = 'translate(0px)';

  // 顶部图片
  // 默认选择第一个
  circleActive = 0;

  // tab 页签默认选中第一个
  tabActiveIndex = 0;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public server: NewService
  ) {
    this.getData();
  }

  ngOnInit(): void {
    // 设置默认路由
    // 路由跳转
    this.router.navigate(['index', 'recommend'], {
      queryParams: {
        key: 'recommend',
      },
    });
  }

  // 获取图片数据
  async getData(): Promise<void> {
    const result = await this.server.getImageData();
    this.quoteList = result.data.items;
    this.quoteList = this.quoteList.slice(0, 9);
  }

  // 切换指数
  toggleZhishu(index: number): void {
    // console.log(index);
    this.circleActive = index;
    this.zhishuListPosition = `translate(-${index * 640}px)`;
  }

  // tab
  tabClick(index: number): void {
    // console.log(index);

    const pathList = ['recommend', 'liveNews', 'hushen', 'kechaung'];
    // 路由跳转
    this.router.navigate(['index', pathList[index]], {
      queryParams: {
        key: pathList[index],
      },
    });
    // 改变页签
    this.tabActiveIndex = index;
  }
}
