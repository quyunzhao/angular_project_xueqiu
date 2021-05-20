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

  // 过滤参数
  category = 'CN';
  exchange = 'sh_sz';
  areacode = '';
  indcode = '';

  // 过滤条件之后的列表
  sxStocksList = [];
  sxStocksLength = 0;

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
    item.min = result.data.min;
    item.max = result.data.max;
    item.Cmin = item.min;
    item.Cmax = item.max;
    this.updateStockList(item);
  }

  // 更新筛选列表
  updateStockList(item): void {
    let isContinue = true;
    this.stockSelectedList.forEach((element, index) => {
      if (element.field === item.field && isContinue) {
        console.log('存在');
        this.stockSelectedList.splice(index, 1);
        isContinue = false;
      }
    });
    if (isContinue) {
      this.stockSelectedList.push(item);
    }
  }

  // 开始选股
  getStock(): void {
    const fileObj = {};
    this.stockSelectedList.forEach((item, index) => {
      if (parseFloat(item.Cmax) > parseFloat(item.Cmin)) {
        fileObj[item.field] = item.Cmin + '_' + item.Cmax;
      } else {
        fileObj[item.field] = item.Cmax + '_' + item.Cmin;
      }
    });

    const time = new Date().getTime;
    const options = {
      params: {
        category: this.category,
        exchange: this.exchange,
        areacode: this.areacode,
        indcode: this.indcode,
        order_by: 'symbol',
        order: 'desc',
        page: 1,
        size: 30,
        only_count: 0,
        current: '',
        pct: '',
        ...fileObj,
        _: time,
      },
    };
    const promise = this.server.getxsStock(options);
    promise
      .then((result) => {
        this.sxStocksLength = result.data.count;
        this.sxStocksList = result.data.list;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
