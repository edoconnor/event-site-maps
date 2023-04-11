import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  FormData!: FormGroup;

  isSubmitted = false;

  constructor(private builder: FormBuilder, private contact: EmailService) {}

  ngOnInit() {
    this.FormData = this.builder.group({
      Fullname: new FormControl('', Validators.required),
      Email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      Comment: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.contact.PostMessage(this.FormData.value).subscribe(
      (response) => {
        this.isSubmitted = true;
      },
      (error) => {
        console.log({ error });
      }
    );
  }
}
