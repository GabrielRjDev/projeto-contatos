import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private firestore: Firestore) {}

  getContacts(): Observable<Contact[]> {
    const contactsRef = collection(this.firestore, 'contacts');
    return collectionData(contactsRef, { idField: 'id' }) as Observable<Contact[]>;
  }

  addContact(contact: Contact) {
    const contactsRef = collection(this.firestore, 'contacts');
    return addDoc(contactsRef, contact);
  }

  deleteContact(contact: Contact) {
    if (!contact.id) return Promise.reject('Contact ID is required');
    const contactDocRef = doc(this.firestore, `contacts/${contact.id}`);
    return deleteDoc(contactDocRef);
  }
}