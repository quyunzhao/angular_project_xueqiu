import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
