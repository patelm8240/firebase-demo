import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../shared/customer.service';
@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  showDeletedMessage:boolean;
  customerArray = [];
  searchText:string="";

  constructor(private customerService : CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomer().subscribe(list => {
      this.customerArray = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      })
    });
  }
  onDelete($key){
    if(confirm("Are you sure you want to delete this record?")){
      this.customerService.deleteCustomer($key);
    }
    this.showDeletedMessage=true;
    setTimeout(() => this.showDeletedMessage=false , 3000);
  }
  filterCondition(customer){
    if(customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1){
     return true;
    }else if(customer.email.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1){
      return true;
    }
    else if(customer.mobile.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1){
      return true;
    }
    else if(customer.location.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1){
      return true;
    }else{
      return false;
    }

    
  }
}
