import { Injectable } from '@angular/core';
import axios from 'axios';

import { base } from '../api/baseApi';
@Injectable({
  providedIn: 'root',
})
export class NewService {
  // 后台端口地址
  public port = base.port;
  public protocol = base.protocol;
  public hostname = base.hostname;

  public baseUrl = '';

  constructor() {
    this.baseUrl = this.protocol + '//' + this.hostname + ':' + this.port;
  }

  // 获取图片数据
  async getImageData(): Promise<any> {
    const httpUrl = this.baseUrl + '/api/index/quote';
    let promise;
    try {
      promise = await axios.get(httpUrl);
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

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

  // 条件股票
  async getcstock(options): Promise<any> {
    const httpUrl = this.baseUrl + '/api/screener/stocks';
    let promise;
    try {
      promise = await axios.get(httpUrl, { params: options.params });
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取筛选工具
  async getTools(): Promise<any> {
    const httpUrl = this.baseUrl + '/api/screener/Tools';
    let promise;
    try {
      promise = await axios.get(httpUrl);
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取字段范围
  async getFieldRange(options): Promise<any> {
    const httpUrl = this.baseUrl + '/api/screener/fieldRange';
    let promise;
    try {
      promise = await axios.get(httpUrl, { params: options.params });
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取筛选的股票
  async getxsStock(options): Promise<any> {
    const httpUrl = this.baseUrl + '/api/screener/sxStock';
    let promise;
    try {
      promise = await axios.get(httpUrl, { params: options.params });
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取日志
  async getLogList(options): Promise<any> {
    const httpUrl = this.baseUrl + '/api/loginCenter/logList';
    let promise;
    try {
      promise = await axios.get(httpUrl, { params: options.params });
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 写写数据
  async creatData(options): Promise<any> {
    const httpUrl = this.baseUrl + '/api/database/creat';
    let promise;
    try {
      promise = await axios.get(httpUrl, { params: options.params });
    } catch (error) {
      throw error;
    }
    return promise.data;
  }

  // 获取广告
  async getAdvertList(options): Promise<any> {
    const httpUrl = this.baseUrl + '/api/loginCenter/advertList';
    let promise;
    try {
      promise = await axios.get(httpUrl, { params: options.params });
    } catch (error) {
      throw error;
    }
    return promise.data;
  }
}
