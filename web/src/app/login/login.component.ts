// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
// })
// export class LoginComponent {}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  //moduleId: module.id.toString(),
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login() {
    console.log("login");
    console.log(this.model);
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log(this.returnUrl)
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error)
          this.alertService.error(error);
        });
  }
}