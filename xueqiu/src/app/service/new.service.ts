import { Injectable } from '@angular/core';
import axios from 'axios';

import { base } from '../api/baseApi';
@Injectable({
  providedIn: 'root',
})
export class NewService {
  public baseUrl = base.url;

  constructor() {}

  // 获取新闻
  getCommandNews(): void {
    const httpUrl = this.baseUrl + '/api/index/news';
  }
}
