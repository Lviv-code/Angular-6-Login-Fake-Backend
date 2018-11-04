import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loading = false;
  submitted = false;
  returnUrl: string;
  form: FormGroup;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(val => {
      this.user = val;
    });
    this.authenticationService.logout();
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/items']);
        },
        error => {
          this.loading = false;
        }
      );

  }


}
