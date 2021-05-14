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
  constructor(public server: NewService) {
    this.getIndustriesData();
    this.getAreaData();
  }

  ngOnInit(): void {}

  // 获取行业数据
  async getIndustriesData(): Promise<void> {
    const result = await this.server.getIndustries();
    // console.log(result.data);
    this.industriesList = result.data.industries;
    // console.log(this.industriesList);
  }

  // 获取区域数据
  async getAreaData(): Promise<void> {
    const result = await this.server.getArea();
    this.areas = result.data.areas;
    console.log(Object.keys(this.areas));
    this.areaList = Object.keys(this.areas);
    // console.log(this.areaList);
  }
}
