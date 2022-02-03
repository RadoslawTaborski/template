import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContainersModule } from './containers/containers.module';
import { ModulesModule } from './modules/modules.module';
import { FooterComponent } from './root/footer/footer.component';
import { HeaderComponent } from './root/header/header.component';
import { ParametersService } from './root/services/parameters.service';
import { StateService } from './root/services/state.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ContainersModule,
    ModulesModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      isolate: false
  }),
    NgbModule
  ],
  providers: [
    ParametersService,
    StateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
