import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAdminWizardComponent } from './features/book-admin-wizard/book-admin-wizard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CreateTaskComponent } from './features/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { HistoryComponent } from './features/history/history.component';
import { RouterModule } from '@angular/router';
import { AppServiceInterceptor } from './shared/interceptor/app-service.interceptor';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app-store/app-state.reducers';

@NgModule({
  declarations: [
    AppComponent,
    BookAdminWizardComponent,
    HeaderComponent,
    FooterComponent,
    CreateTaskComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HistoryComponent,
    StoreModule.forRoot(reducers)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppServiceInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
