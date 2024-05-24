import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ToastService, ToastType} from "../../services/toast/toast.service";
import {Contact} from "../../models/Contact.model";
import {ContactService} from "../../services/contact/contact.service";
import {MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatButton
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm : FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private contactService : ContactService,
              private toastService: ToastService,) {
    this.contactForm = this.formBuilder.group( {
      title: ['', Validators.required],
      mail: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(){
    const formData = this.contactForm.value;
    let contact = {
      title: formData.title,
      mail: formData.mail,
      description: formData.description
    }
    this.contactService.sendContact(new Contact(contact)).subscribe((data) => {
      this.toastService.showToaster(ToastType.SUCCESS,'Votre message a bien été envoyé');
    });
  }

  getTitle(){
    if(this.contactForm && this.contactForm.get('title')){
      return this.contactForm.get('title')
    }
    return '';
  }

}
