import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  isPasscode = false;
  showPassword = false;
  form: FormGroup;

  constructor(injector: Injector) {
    super(injector);
    this.form = new FormGroup({
      role: new FormControl('Pathology', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      isPasscode: new FormControl(false)
    });
  }

  ngOnInit(): void {
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  togglePasscode(): void {
    this.isPasscode = !this.isPasscode;
    this.form.get('isPasscode').setValue(this.isPasscode);
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

  handleLogin(): void {
    console.log(this.form.value);
    this.http.post('login', this.form.value, {}).toPromise().then((data) => {
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
        if (data.user.registration_step == 1){
          this.router.navigate(['complete-registration']);
        } else {
          this.router.navigate(['dashboard']);
        }
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
  };
}
