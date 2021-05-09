import { Component, OnInit } from '@angular/core';

// 导入
import { base } from '../../api/baseApi';
import axios from 'axios';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  // 服务器地址
  public baseUrl = base.url;

  // 指数列表
  quoteList = [];

  // 指数列表位置
  zhishuListPosition = 'translate(0px)';
  // 默认选择第一个
  circleActive = 0;

  constructor() {
    this.getData();
  }

  ngOnInit(): void {}

  // 获取图片数据
  async getData(): Promise<void> {
    const result = await axios.get(this.baseUrl + '/api/index/quote');
    // console.log(result.data);
    this.quoteList = result.data.data.items;
    this.quoteList = this.quoteList.slice(0, 9);
    console.log(this.quoteList);
  }

  // 切换指数
  toggleZhishu(index: number): void {
    console.log(index);
    this.circleActive = index;
    this.zhishuListPosition = `translate(-${index * 640}px)`;
  }
}
