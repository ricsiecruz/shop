import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  
  constructor(
    public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }
  
  get f() { return this.loginForm.controls; }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authenticationService.login(this.f['username'].value, this.f['password'].value)
        .pipe(first())
        .subscribe(
            data => {
                // this.isLoginFailed = false;
                // this.router.navigate([this.returnUrl]);
                console.log("success", data)
            },
            error => {
                console.log("error")
            });

    // this.authenticationService.login(this.f['userName'].value, this.f['password'].value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             // this.isLoginFailed = false;
    //             // this.router.navigate([this.returnUrl]);
    //             console.log("success", data)
    //         },
    //         error => {
    //             console.log("error")
    //         });
}

}
