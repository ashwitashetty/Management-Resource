import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  empNameList: any = [];
  constructor(private http: HttpClient) {}
  getAllEmployeeDetails() {
    return this.http.get(
      'https://pmt-service.onrender.com/api/employees',
      {
        headers: {
          'x-api-key': 'secrt-dev-1505',
        },
      }
     
    );
  }
  addEmployeeData(data: any) {
    const name: string = data.name;
    this.empNameList.push(name);
    console.log('emp list ', this.empNameList);
    console.log('data ', name);
    return this.http.post(
      'https://project-management-tool-dff6f-default-rtdb.asia-southeast1.firebasedatabase.app/employees.json',
      data
    );
  }
}
