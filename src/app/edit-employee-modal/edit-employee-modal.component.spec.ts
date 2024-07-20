// edit-employee-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../employee';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.css']
})
export class EditEmployeeModalComponent {
  @Input() employee: Employee | null = null;
  @Output() saveChangesEvent = new EventEmitter<Employee>();
  @Output() closeModalEvent = new EventEmitter<void>();

  editedEmployee: Employee = {} as Employee;

  ngOnInit() {
    if (this.employee) {
      // Create a copy of the employee to avoid directly modifying the original object
      this.editedEmployee = { ...this.employee };
    }
  }

  saveChanges() {
    if (this.editedEmployee) {
      this.saveChangesEvent.emit(this.editedEmployee);
    }
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
