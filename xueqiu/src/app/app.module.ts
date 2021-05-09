import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index/index.component';
import { ChooseComponent } from './views/choose/choose.component';
import { NewstockComponent } from './views/newstock/newstock.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { DayinfoComponent } from './component/dayinfo/dayinfo.component';
import { RecommendComponent } from './component/recommend/recommend.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ChooseComponent,
    NewstockComponent,
    NotfoundComponent,
    DayinfoComponent,
    RecommendComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
