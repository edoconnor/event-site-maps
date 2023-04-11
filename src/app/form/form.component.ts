import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  formData: any = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // You can add additional form processing logic here, such as sending the data to a server
  }
}
