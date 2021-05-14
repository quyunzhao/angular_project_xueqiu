import { Injectable } from '@angular/core';
import axios from 'axios';

import { base } from '../api/baseApi';
@Injectable({
  providedIn: 'root',
})
export class NewService {
  public baseUrl = base.url;

  constructor() {}

  // 雪球热帖
  async getHotList(): Promise<any> {
    const httpUrl = this.baseUrl + '/api/index/hotList';
    let promise;
    try {
      promise = await axios.get(httpUrl);
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 7*24
  async getNews(): Promise<any> {
    const httpUrl = this.baseUrl + '/api/index/news';
    let promise;
    try {
      promise = await axios.get(httpUrl);
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取行业
  async getIndustries(): Promise<any> {
    const httpUrl = this.baseUrl + '/api/screener/industries';
    let promise;
    try {
      promise = await axios.get(httpUrl);
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取地区
  async getArea(): Promise<any> {
    const httpUrl = this.baseUrl + '/api/screener/area';
    let promise;
    try {
      promise = await axios.get(httpUrl);
    } catch (error) {
      throw error;
    }
    return promise.data;
  }
}
