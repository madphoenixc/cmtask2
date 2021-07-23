import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { detailsmodel } from './dashboard.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formvalue !: FormGroup;
  detailsmodelobj : detailsmodel=new detailsmodel();
  productdata !: any;
  constructor(private formbuilder: FormBuilder,private api: ApiService) { 

  }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      name:[''],
      quantity:[''],
      image:[''],
      price:['']
    })
    this.getalldetails();
  }
  postproductdetail(){
    this.detailsmodelobj.name=this.formvalue.value.name;
    this.detailsmodelobj.quantity=this.formvalue.value.quantity;
    this.detailsmodelobj.image=this.formvalue.value.image;
    this.detailsmodelobj.price=this.formvalue.value.price;

    this.api.postdetail(this.detailsmodelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Detail Added Successfully")
      this.formvalue.reset();
      this.getalldetails();
    },
    err=>{
      alert("Details Not Added ")
    })
  }
  getalldetails(){
    this.api.getdetail()
    .subscribe(res=>{
      this.productdata=res;
    })
  }
}
