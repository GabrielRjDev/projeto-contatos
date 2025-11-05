import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonInput, IonButton, IonButtons, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { ContactService } from '../services/contact.service';
import { addIcons } from 'ionicons';
import { saveOutline, arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.page.html',
  styleUrls: ['./adicionar-contato.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    IonIcon
  ]
})
export class AdicionarContatoPage {
  contactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    addIcons({
      saveOutline,
      arrowBack
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      try {
        await this.contactService.addContact(this.contactForm.value);
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    }
  }
}
