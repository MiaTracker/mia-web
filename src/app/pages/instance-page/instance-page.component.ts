import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {HttpService} from "../../services/http.service";
import {AppConfig} from "../../config/app.config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-instance-page',
  templateUrl: './instance-page.component.html',
  styleUrls: ['./instance-page.component.sass']
})
export class InstancePageComponent {
  instanceFormControl = new FormControl('', { validators: [Validators.required]});

  constructor(private service: HttpService, private router: Router) {
    if(!AppConfig.env.env.desktop || AppConfig.run.instance_url)
      this.router.navigateByUrl("/login");
  }

  protected setInstance() {
    if(this.instanceFormControl.value == null) return;
    let url: string;
    if(this.instanceFormControl.value?.endsWith("/"))
      url = this.instanceFormControl.value.substring(0, this.instanceFormControl.value?.length - 1)
    else url = this.instanceFormControl.value;
    const res = this.service.ping(url);
    res.subscribe(
      {
        next: _ => {
          localStorage.setItem('instance_url', url);
          AppConfig.run.instance_url = url;
          AppConfig.run.clearToken();
          this.router.navigateByUrl("/login");
        },
        error: _ => {
          this.instanceFormControl.setErrors({ connectionFailed: true })
        }
      }
    )
  }
}
