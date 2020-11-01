import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(public storage: StorageMap) { }

  async canActivate() {
    const data = await this.storage.get('token').toPromise().then((d) => {
      console.log(d)
      return d && d != '';
    }).catch(() => {
      return false;
    });
    console.log(data);
    return data;
  }
}
