import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

export class DetailsGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (route.queryParams.lat && route.queryParams.lon) {
            return true;
        }

        return this.router.createUrlTree(['']);
    }
}