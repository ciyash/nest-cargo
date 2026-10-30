import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  host: {'[class.cargo-workspace]': 'isWorkspace', '[class.cargo-print-view]': 'isPrintView'},
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CargoNest';
  constructor(private router: Router) {}
  get isPrintView() { return /(?:^|\/)[^/]*print[^/]*(?:\/|$)/i.test(this.router.url.split('?')[0]); }
  get isWorkspace() { const route = this.router.url.split('?')[0].replace(/\/+$/,''); return !this.isPrintView && !['','/login','/clogin','/signup','/company-register'].includes(route); }
}
