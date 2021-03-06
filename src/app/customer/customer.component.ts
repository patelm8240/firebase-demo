import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
@Component({
  selector: 'customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  submitted:boolean;
  showSuccessMessage:boolean;
  formControls = this.customerService.form.controls;
  successMessage:string;
  constructor(public customerService : CustomerService) { }

  ngOnInit() {
  }
  
  onSubmit(){
    this.submitted=true;
    if(this.customerService.form.valid){
      if(this.customerService.form.get('$key').value == null){
        this.customerService.insertCustomer(this.customerService.form.value);
        this.successMessage="Submmitted";
      }
      else{
        this.customerService.updateCustomer(this.customerService.form.value);
        this.successMessage="Updated";
      }
    this.showSuccessMessage=true;
    setTimeout(() => this.showSuccessMessage=false , 3000);
    this.submitted=false;
    this.customerService.form.reset();
    }
  }
}
