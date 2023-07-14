import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    age: new FormControl(''),
    title: new FormControl(''),

  });
  constructor(private fb: FormBuilder) {


  }

  ngOnInit(): void {
  }
  form = false;
  showform() {
  this.form = true;
}

}
