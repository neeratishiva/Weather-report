import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
import { RestApiService } from '../rest-api.service'
@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {

  zip_code:any;
  weather_DataList:any=[];

  constructor(private rest_service:RestApiService, private router:Router,
    // private spinner : NgxSpinnerService
    ) { }

  ngOnInit():void {
    // this.spinner.show();
    this.getCurrentWeatherList();
  }

  onKeydown(event:any) {
    let numArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace","Tab"]
    let temp = numArray.includes(event.key); //gives true or false
    if (!temp) {
      event.preventDefault();
    }
  }

  addZipCode(){
    if(!this.zip_code){
      console.log('test');
      Swal.fire({
        icon: 'error',
        position: 'top-end',
        title: 'No zipcode found',
        text: 'Please enter zipcode',
        showConfirmButton: false,
        timer: 2000
      })
      return
    }
    // this.spinner.show();
    this.rest_service.getWetherDataByZipCode(this.zip_code).subscribe((response:any)=>{
      // this.spinner.hide();
      if (response) {
        response = { ...response, zipcode: this.zip_code };
        this.weather_DataList.push(response);
        localStorage.setItem('weather_list',JSON.stringify(this.weather_DataList));
      }
      this.zip_code = '';
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'zipcode added successfully',
        showConfirmButton: false,
        timer: 2000
      })
    },err=>{
      // this.spinner.hide();
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'invalid zipcode: ' + this.zip_code +', or data not availble for this zipcode.',
        showConfirmButton: false,
        timer: 2000,
      })
    })
  }

  getCurrentWeatherList() {    
    // this.spinner.hide();
    const data = JSON.parse(localStorage.getItem('weather_list')!);
    if (data) 
    this.weather_DataList = data;
  }

  delete(zipcode: string) {
    if (this.weather_DataList && this.weather_DataList.length > 0) {
      this.weather_DataList = this.weather_DataList.filter(
        (data: any) => data.zipcode !== zipcode
      );
      localStorage.setItem(
        'weather_list',
        JSON.stringify(this.weather_DataList)
      );
    }
  }

  navigatetoDetail(zipcode:any){
    this.router.navigate(['/report'],{queryParams:{id:zipcode}})
  }

}
