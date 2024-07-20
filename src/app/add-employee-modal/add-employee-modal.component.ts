import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Employee } from '../employee';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AddEmployeeModalComponent {
  @Output() addEmployeeEvent = new EventEmitter<Employee>();
  @Output() closeModalEvent = new EventEmitter<void>();

  public newEmployee: Employee = {
    id: 0,
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imageUrl: '',
    employeeCode: '' // Include this property
  };

  public onAddEmployee(form: NgForm): void {
    if (form.valid) {
      this.addEmployeeEvent.emit(this.newEmployee);
      this.newEmployee = {
        id: 0,
        name: '',
        email: '',
        jobTitle: '',
        phone: '',
        imageUrl: '',
        employeeCode: '' // Reset this property
      };
    }
  }

  public onCloseModal(): void {
    this.closeModalEvent.emit();
  }
}
