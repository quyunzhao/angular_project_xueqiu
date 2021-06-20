import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './views/index/index.component';
import { ChooseComponent } from './views/choose/choose.component';
import { NewstockComponent } from './views/newstock/newstock.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { DayinfoComponent } from './component/dayinfo/dayinfo.component';
import { RecommendComponent } from './component/recommend/recommend.component';
import { TotimePipe } from './pipe/totime.pipe';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './views/footer/footer.component';
import { HeaderComponent } from './views/header/header.component';
import { AdpageComponent } from './views/adpage/adpage.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ChooseComponent,
    NewstockComponent,
    NotfoundComponent,
    DayinfoComponent,
    RecommendComponent,
    TotimePipe,
    FooterComponent,
    HeaderComponent,
    AdpageComponent,
  ],
  // import HttpClientModule after BrowserModule.
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
