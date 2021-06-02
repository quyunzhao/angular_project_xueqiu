import { Component, OnInit } from '@angular/core';
import { NewService } from 'src/app/service/new.service';

@Component({
  selector: 'app-adpage',
  templateUrl: './adpage.component.html',
  styleUrls: ['./adpage.component.less'],
})
export class AdpageComponent implements OnInit {
  constructor(public server: NewService) {}

  ngOnInit(): void {}

  async creatData(): Promise<void> {
    const options = {
      params: {
        documentName: 'test',
        text: '',
        description: 'description',
      },
    };
    const result = await this.server.creatData(options);
    console.log(result);
  }
}
