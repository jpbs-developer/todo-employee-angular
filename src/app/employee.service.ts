import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Employee } from './states/employee-state.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  findAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.api}/employees`).pipe(
      map((employees) => {
        return employees.map((employee) => {
          employee.birthDate = employee.birthDate
            .split('-')
            .reverse()
            .join('/');
          return employee;
        });
      })
    );
  }
}