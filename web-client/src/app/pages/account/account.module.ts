import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule } from '@angular/router';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [
    AccountComponent,AccountDetailsComponent,MyOrdersComponent,ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    NgOtpInputModule,
    RouterModule.forChild([{
      path: '',
      component: AccountComponent,
      children: [
        { path: '', redirectTo: 'account-details', pathMatch: 'full' },
        { 
          path: 'account-details', 
          component: AccountDetailsComponent,
          canActivate: [AuthGuard],
          data: { title: 'Account Details', footerClass: 'mt-no-text' },
        },
        { path: 'my-orders', 
          component: 
          MyOrdersComponent ,
          canActivate: [AuthGuard],
          data: { title: 'My Orders', footerClass: 'mt-no-text' },
        },
        { path: 'change-password', 
          component: ChangePasswordComponent ,
          canActivate: [AuthGuard],
          data: { title: 'Change Password', footerClass: 'mt-no-text' },
        }
      ]
    }
    ])
  ]
})
export class AccountModule { }
