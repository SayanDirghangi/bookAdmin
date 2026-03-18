import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAdminWizardComponent } from './features/book-admin-wizard/book-admin-wizard.component';
import { CreateTaskComponent } from './features/create-task/create-task.component';
 import { AboutUsComponent } from './features/about-us/about-us.component';
 import { HistoryComponent } from './features/history/history.component';
 import { AuthGuard } from '../app/features/auth.guard';
const routes: Routes = [
  { path: '', component: BookAdminWizardComponent, canActivate: [AuthGuard] },
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'about-us', component: AboutUsComponent, canActivate: [AuthGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
