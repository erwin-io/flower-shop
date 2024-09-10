import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerUser } from 'src/app/model/customer-user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerUserService } from 'src/app/services/customer-user.service';
import { LoaderService } from 'src/app/services/loader.service';
import { OneSignalService } from 'src/app/services/one-signal.service';
import { StorageService } from 'src/app/services/storage.service';
import { Modal } from 'bootstrap';
import { MODAL_TYPE, ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent {
  form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  submitted = false;
  error: string;
  isProcessing = false;
  currentUser: CustomerUser;
  modalInstance;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private customerUserService: CustomerUserService,
    private authService: AuthService,
    private storageService: StorageService,
    private oneSignalService: OneSignalService,
    private loaderService: LoaderService,
    private modalService: ModalService,
    private snackBar: MatSnackBar,
    private router: Router) {
      this.currentUser = this.storageService.getCurrentUser();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.currentUser && this.currentUser?.customerUserCode && this.currentUser?.customerUserCode !== '') {
      this.form.setValue({
        name: this.currentUser?.name,
        email: this.currentUser?.email,
      })
    }
    this.form.valueChanges.subscribe(res=> {
      this.error = null;
    });
  }

  get isAuthenticated() {
    return this.currentUser && this.currentUser?.customerUserCode;
  }

  async onSubmit() {
    try {
      if (!this.isAuthenticated) {
        window.location.href = "login";
      }
      if (this.form.invalid) {
          return;
      }
      this.modalService.openPromptModal({
        header: "Are you sure you want to save changes?",
        description: "You are about to save changes to your account details. Do you want to proceed?",
        confirmText: "Save Changes",
        confirm: () => {
          this.modalService.close(MODAL_TYPE.PROMPT);
          this.onSaveChanges();
        }
      });
    } catch(ex) {
      this.modalService.closeAll();
    }
  }

  async onSaveChanges() {
    try{
      this.isProcessing = true;
      const params = this.form.value;
      this.loaderService.show();
      this.customerUserService.updateProfile(this.currentUser?.customerUserCode, params)
        .subscribe(async res => {
          this.isProcessing = false;
          this.loaderService.hide();
          if (res.success) {
            this.modalService.openResultModal({
              success: true,
              header: "Changes Saved Successfully!",
              description: "Your account details have been updated.",
              confirm: ()=> {
                this.modalService.close(MODAL_TYPE.RESULT);
              }
            });
            this.currentUser = res.data;
            this.storageService.saveCurrentUser(this.currentUser);
          } else {
            this.isProcessing = false;
            this.loaderService.hide();
            this.error = Array.isArray(res.message) ? res.message[0] : res.message;
            this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
            this.loaderService.hide();
            this.modalService.openResultModal({
              success: false,
              header: "Error Saving Changes!",
              description: this.error,
              confirm: ()=> {
                this.modalService.closeAll();
              }
            });
          }
        }, async (res) => {
          this.isProcessing = false;
          this.loaderService.hide();
          this.error = res.error.message;
          this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
          this.loaderService.hide();
          this.modalService.openResultModal({
            success: false,
            header: "Error Saving Changes!",
            description: this.error,
            confirm: ()=> {
              this.modalService.closeAll();
            }
          });
        });
    } catch (e){
      this.isProcessing = false;
      this.loaderService.hide();
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.open(this.error, 'close', {panelClass: ['style-error']});
      this.loaderService.hide();
      this.modalService.openResultModal({
        success: false,
        header: "Error Saving Changes!",
        description: this.error,
        confirm: ()=> {
          this.modalService.closeAll();
        }
      });
    }
  }
}
