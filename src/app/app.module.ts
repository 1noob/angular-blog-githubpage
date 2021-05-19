import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './list/list.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { CommonModule } from "@angular/common";
import { ArticleComponent } from "./article/article.component";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NZ_CONFIG, NzConfig} from "ng-zorro-antd/core/config";

registerLocaleData(zh);

const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  notification: {
    // nzTop: 240,
    nzPauseOnHover: true
  }
};

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    CommonModule,
    NzSpinModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
