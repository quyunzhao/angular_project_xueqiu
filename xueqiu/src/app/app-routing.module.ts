import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 导入组件
import { IndexComponent } from './views/index/index.component';
import { ChooseComponent } from './views/choose/choose.component';
import { NewstockComponent } from './views/newstock/newstock.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

import { DayinfoComponent } from './component/dayinfo/dayinfo.component';
import { RecommendComponent } from './component/recommend/recommend.component';
import { AdpageComponent } from './views/adpage/adpage.component';
import { MapsComponent } from './views/maps/maps.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      {
        path: 'recommend',
        component: RecommendComponent,
      },
      {
        path: 'liveNews',
        component: DayinfoComponent,
      },
      {
        path: 'hushen',
        component: RecommendComponent,
      },
      {
        path: 'kechaung',
        component: RecommendComponent,
      },
    ],
  },
  {
    path: 'screener',
    component: ChooseComponent,
  },
  {
    path: 'newStock',
    component: NewstockComponent,
  },
  {
    path: 'advertisement',
    component: AdpageComponent,
  },
  {
    path: 'maps',
    component: MapsComponent,
  },

  // 404
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
