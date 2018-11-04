import {Component, OnInit} from '@angular/core';
import {User} from '../user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../_services/http.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  errorMessage: string;
  error = false;


  form: FormGroup;

  constructor(
    private router: Router,
    private http: HttpService,
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
  }

  registerUser() {
    if (this.form.invalid) {
      return;
    }
    this.http.register(this.user)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = true;
          this.errorMessage = error.error.message;
        }
      );
  }
}
