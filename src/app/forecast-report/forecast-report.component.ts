import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgxSpinnerService } from "ngx-spinner";
import { RestApiService } from "../rest-api.service";

@Component({
  selector: 'app-forecast-report',
  templateUrl: './forecast-report.component.html',
  styleUrls: ['./forecast-report.component.scss']
})
export class ForecastReportComponent implements OnInit {

  zip_Code:any;
  weatherDetails: any;
  filteredForeCastList = [];

  constructor(private activatedroute: ActivatedRoute,
    private rest_api:RestApiService, private Router: Router,
    // private spinner : NgxSpinnerService
    ) {
      this.activatedroute.queryParams.subscribe((data) => {
        this.zip_Code = data['id'];
      });
     }

  ngOnInit():void {
    // this.spinner.show();
    this.getWeatherDetails();
  }

  getWeatherDetails(){
    this.rest_api.get5daysData(this.zip_Code).subscribe((response: any) => {
      // this.spinner.hide();
      if (response) {
        this.weatherDetails = response;
        this.weatherDetails.list.forEach((res: any, index: number) => {
          this.weatherDetails.list[index] = {
            ...this.weatherDetails.list[index],
            updated_date: new Date(res.dt * 1000),
          };
        });
      }
    });
}

backtoHome(){
  this.Router.navigate(['/weather-report']);
}

}
