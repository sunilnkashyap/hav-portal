import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent extends BaseComponent implements OnInit {

  user: any = {};
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.storage.get('user').subscribe((data) => {
      console.log(data);
      this.user = data;
    });
  }

}
