import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 导入组件
import { IndexComponent } from './views/index/index.component';
import { ChooseComponent } from './views/choose/choose.component';
import { NewstockComponent } from './views/newstock/newstock.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'screener',
    component: ChooseComponent,
  },
  {
    path: 'newstock',
    component: NewstockComponent,
  },
  // 404
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
