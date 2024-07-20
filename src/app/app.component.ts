import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditEmployeeModalComponent } from './edit-employee-modal/edit-employee-modal.component';
import { AddEmployeeModalComponent } from './add-employee-modal/add-employee-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule, EditEmployeeModalComponent, AddEmployeeModalComponent]  // Include the modal component here
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public employees: Employee[] = [];
  public editEmployee: Employee | null = null;
  public deleteEmployee: Employee | null = null;
  public addEmployee: boolean = false; // State to control Add Employee modal
  public searchKey: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(newEmployee: Employee): void {
    this.employeeService.addEmployee(newEmployee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        this.addEmployee = false; // Close Add Employee modal
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onSaveChanges(updatedEmployee: Employee): void {
    this.employeeService.updateEmployee(updatedEmployee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        this.editEmployee = null; // Close Edit Employee modal
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDelete(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEdit(employee: Employee): void {
    this.editEmployee = { ...employee };
    console.log(this.editEmployee); // Add this line to debug
  }

  public onAdd(): void {
    this.addEmployee = true; // Show Add Employee modal
  }
  public searchEmployees(): void {
    if (this.searchKey) {
      this.employeeService.searchEmployees(this.searchKey).subscribe(
        (response: Employee[]) => {
          this.employees = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      this.getEmployees();
    }
  }
}
