import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getAllProjectDetails(){
    return this.http.get(
      'https://pmt-service.onrender.com/api/projects',
      {
        headers: {
          'x-api-key': 'secrt-dev-1505',
        },
      }
    );
  }
  addProjectData(data: any) {
    console.log("data",data)
    return this.http.post(
      'https://pmt-service.onrender.com/api/projects',
      data,{
        headers: {
          'x-api-key': 'secrt-dev-1505',
        },
      }
    );
  }
}
