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
  
  // Signal für das Overlay
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
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
            this.showSuccessOverlay.set(true);
            // Overlay nach 3 Sekunden automatisch schließen
            setTimeout(() => this.showSuccessOverlay.set(false), 3000);
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
      this.showSuccessOverlay.set(true);
      // Overlay nach 3 Sekunden automatisch schließen (für Test-Modus)
      setTimeout(() => this.showSuccessOverlay.set(false), 3000);
    }
  }

  // Methode zum manuellen Schließen des Overlays
  closeOverlay() {
    this.showSuccessOverlay.set(false);
  }
}