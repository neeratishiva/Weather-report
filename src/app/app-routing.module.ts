import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherReportComponent } from './weather-report/weather-report.component';
import { ForecastReportComponent } from './forecast-report/forecast-report.component'

const routes: Routes = [
  { path:'', redirectTo:"weather-report", pathMatch:"full" },
  
  {path:'weather-report',component:WeatherReportComponent},
 
  {path:'report',component:ForecastReportComponent},
  { path: '**', redirectTo: 'weather-report' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
