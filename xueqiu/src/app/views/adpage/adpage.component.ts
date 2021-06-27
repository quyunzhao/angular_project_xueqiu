import { Component, OnInit } from '@angular/core';
import { NewService } from 'src/app/service/new.service';

@Component({
  selector: 'app-adpage',
  templateUrl: './adpage.component.html',
  styleUrls: ['./adpage.component.less'],
})
export class AdpageComponent implements OnInit {
  text = '';
  description = '';
  advertList = [];

  constructor(public server: NewService) {}

  ngOnInit(): void {
    this.getAdvertList();
  }

  async creatData(): Promise<void> {
    if (this.text.trim() === '') {
      console.log('标题不能为空');
      return;
    }
    const options = {
      params: {
        documentName: 'test',
        text: this.text,
        description: this.description,
      },
    };
    const result = await this.server.creatData(options);
    this.text = '';
    this.description = '';

    console.log(result);
  }

  async getAdvertList(): Promise<void> {
    const options = {
      params: {
        skip: 0,
        limit: 10,
      },
    };
    const result = await this.server.getAdvertList(options);
    this.advertList = result;
    console.log(result);
  }

  deleteAd(item): void {
    const id = item._id;
    console.log(id);
  }
}
