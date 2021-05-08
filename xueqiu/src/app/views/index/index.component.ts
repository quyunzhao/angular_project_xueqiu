import { Component, OnInit } from '@angular/core';

import axios from 'axios';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
})
export class IndexComponent implements OnInit {
  public baseUrl = 'http://localhost:8080';
  constructor() {
    this.getData();
  }

  ngOnInit(): void {}

  // 获取图片数据
  async getData(): Promise<void> {
    const result = await axios.get(this.baseUrl + '/api/index/quote');
    console.log(result.data);
  }
}
