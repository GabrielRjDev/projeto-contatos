import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, 
  IonAvatar, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonFab, IonFabButton,
  IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.interface';
import { Observable } from 'rxjs';
import { addIcons } from 'ionicons';
import { personCircle, callOutline, mailOutline, peopleOutline, add, trash } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonIcon,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonFab,
    IonFabButton
  ],
})
export class HomePage implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.getContacts();
    addIcons({
      personCircle,
      callOutline,
      mailOutline,
      peopleOutline,
      add,
      trash
    });
  }

  ngOnInit() {}

  async deleteContact(contact: Contact) {
    try {
      await this.contactService.deleteContact(contact);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
}
