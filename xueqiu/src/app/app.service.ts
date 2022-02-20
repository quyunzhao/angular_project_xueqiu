import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  static imageConvert(url: string): string {
    return environment.production
      ? url.replace('assets', 'xueqiu/assets')
      : url.replace('assets', 'xueqiu/assets');
  }

  constructor(private http: HttpClient) {}
}
