import { Component, OnInit } from '@angular/core';
import { NewService } from 'src/app/service/new.service';

@Component({
  selector: 'app-newstock',
  templateUrl: './newstock.component.html',
  styleUrls: ['./newstock.component.less'],
})
export class NewstockComponent implements OnInit {
  constructor(public server: NewService) {}

  ngOnInit(): void {}

  async getLogList(): Promise<void> {
    const result = await this.server.getLogList();
    console.log(result);
  }
}
