import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  BASE_URL=environment.url_api
  constructor(private http: HttpClient) {}
  employeeDetail: object;
  getAllProjectDetails() {
    return this.http.get(`${this.BASE_URL}projects`);
  }
  addProjectData(data: any) {
    return this.http.post(
      `${this.BASE_URL}projects`,
      data
    );
  }
  fetchProjectStatus(data: any, id: any) {
    return this.http.put(
      `${this.BASE_URL}projects/${id}/update_status`,
      { status: data }
    );
  }
}
