import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getAllProjectDetails(){
    return this.http.get(
      'https://project-management-tool-dff6f-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json',
      {
        params: {
          key: 'AIzaSyDEenVAbz9MYo4r96CxIfxLPFNQcyrMD1U',
        },
      }
    );
  }
  addProjectData(data: any) {
    console.log("data",data)
    return this.http.post(
      'https://project-management-tool-dff6f-default-rtdb.asia-southeast1.firebasedatabase.app/projects.json',
      data
    );
  }
}
