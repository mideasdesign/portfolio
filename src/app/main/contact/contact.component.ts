import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private translate: TranslateService){}
  
  // Signal for the overlay
  showSuccessOverlay = signal(false);
  switchLang(language: string){
   this.translate.use(language);
}

http = inject(HttpClient);
  contactData ={
    name: '',
    email: '',
    subject: '',
    message: '',
    policy: ''
  };
 mailTest = false;

  post = {
    endPoint: 'https://markusfischer-developer.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      if (!this.mailTest) {
        this.sendEmail(ngForm);
      } else {
        this.handleTestMode(ngForm);
      }
    }
  }

  private sendEmail(ngForm: NgForm) {
    this.http.post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: (response) => this.handleSubmitSuccess(ngForm),
        error: (error) => console.error(error),
        complete: () => console.info('send post complete'),
      });
  }

  private handleTestMode(ngForm: NgForm) {
    ngForm.resetForm();
    this.showSuccessOverlay.set(true);
    // Close overlay automatically after 3 seconds (for test mode)
    setTimeout(() => this.showSuccessOverlay.set(false), 3000);
  }

  private handleSubmitSuccess(ngForm: NgForm) {
    ngForm.resetForm();
    this.showSuccessOverlay.set(true);
    // Close overlay automatically after 3 seconds
    setTimeout(() => this.showSuccessOverlay.set(false), 3000);
  }

  // Method to manually close the overlay
  closeOverlay() {
    this.showSuccessOverlay.set(false);
  }
}