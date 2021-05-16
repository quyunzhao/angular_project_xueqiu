import { Component, OnInit } from '@angular/core';
import { NewService } from 'src/app/service/new.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.less'],
})
export class ChooseComponent implements OnInit {
  // 行业
  industriesList = [];
  // 地区
  areaList = [];
  areas = {};

  // 工具
  tools = {};

  // 股票筛选
  stock = {};

  // tab列表
  tabList = [];
  tabObj = { 基本指标: [] };
  // 当前选中项
  currentTab = '基本指标';
  currentTabActive = 0;

  // 筛选列表
  stockSelectedList = [];

  constructor(public server: NewService) {
    this.getIndustriesData();
    this.getAreaData();
    this.getTools();
    this.getCstock();
  }

  ngOnInit(): void {}

  // 获取行业数据
  async getIndustriesData(): Promise<void> {
    const result = await this.server.getIndustries();
    this.industriesList = result.data.industries;
  }

  // 获取区域数据
  async getAreaData(): Promise<void> {
    const result = await this.server.getArea();
    this.areas = result.data.areas;
    this.areaList = Object.keys(this.areas);
  }

  // 获取工具
  async getTools(): Promise<void> {
    const result = await this.server.getTools();
    this.tabObj = result;
    // console.log(this.tabObj);
    this.tools = this.tabObj;
    this.tabList = Object.keys(this.tabObj);
  }

  // 获取股票筛选
  async getCstock(): Promise<void> {
    const options = {
      params: {
        order: 'desc',
        order_by: 'follow',
        page: 1,
      },
    };
    const result = await this.server.getcstock(options);
    this.stock = result.data;
  }

  // 点击切换TAb
  toggleTabs(tab, index): void {
    this.currentTab = tab;
    this.currentTabActive = index;
  }

  // 点击事件
  async checkField(item): Promise<void> {
    const options = {
      params: item.field,
    };
    const result = await this.server.getFieldRange(options);
    // console.log(result.data);
    item.min = result.data.min;
    item.max = result.data.max;
    this.stockSelectedList.push(item);
  }
}
