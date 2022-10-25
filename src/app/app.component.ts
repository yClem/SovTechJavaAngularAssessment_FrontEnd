import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }

  title = 'SE Assesment';

  ngOnInit() { }

  gotoDashboard() {
    const returnUrl = "/dashboard";
    this.router.navigate([returnUrl]);
  }
}