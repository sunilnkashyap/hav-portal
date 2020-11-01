import { Component, Injector } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base',
  template: ``,
  styleUrls: ['./base.component.scss']
})
export abstract class BaseComponent {

  spinner: NgxSpinnerService;
  swal: typeof Swal;
  http: HttpService;
  storage: StorageMap;
  router: Router;
  activatedRoute: ActivatedRoute;

  constructor(injector: Injector) {
    this.spinner = injector.get(NgxSpinnerService);
    this.swal = Swal;
    this.http = injector.get(HttpService);
    this.storage = injector.get(StorageMap);
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
  }


  logout() {
    this.storage.clear().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });

  }

}
