import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  form: FormGroup;

  constructor(injector: Injector) {
    super(injector);
    this.form = new FormGroup({
      role: new FormControl('Pathology', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      passcode: new FormControl('', [Validators.required]),
      privacyPolicy: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  handleFormSubmit(): void {
    console.log(this.form.value);
    this.http.post('register', this.form.value, {}).toPromise().then((data) => {
      console.log(data);
      this.storage.set('token', data.token).subscribe(() => {});
      this.storage.set('user', data.user).subscribe(() => {});

      this.spinner.hide();
      this.swal.fire({
        title: 'Success!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Okay'
      }).then(() => {
        this.router.navigate(['complete-registration']);
      });
    }).catch((error) => {
      console.log(error);
      this.swal.fire({
        title: 'Error!',
        text: error.error.message,
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    });
  }

  sendPasscode(): void {
    if (this.form.get('email').value == ''){
      this.swal.fire({
        title: 'Email is required!',
        text: 'Please enter email address.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
      return;
    }
    this.spinner.show();
    this.http.post('send-passcode', {email: this.form.get('email').value}, {}).subscribe((data) => {
      console.log(data);
      this.spinner.hide();
      this.swal.fire({
        title: 'Passcode sent',
        text: 'Passcode sent to email address.',
        icon: 'success',
        confirmButtonText: 'Okay'
      });
    });
  }
}
