import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  employeeDetail: object;
  getAllProjectDetails() {
    return this.http.get("https://pmt-service.onrender.com/api/projects", {
      headers: {
        "x-api-key": "secrt-dev-1505",
      },
    });
  }
  addProjectData(data: any) {
    return this.http.post(
      "https://pmt-service.onrender.com/api/projects",
      data,
      {
        headers: {
          "x-api-key": "secrt-dev-1505",
        },
      }
    );
  }
  fetchProjectStatus(data: any, id: any) {
    return this.http.put(
      `https://pmt-service.onrender.com/api/projects/${id}/update_status`,
      { status: data },
      {
        headers: {
          "x-api-key": "secrt-dev-1505",
        },
      }
    );
  }
}
