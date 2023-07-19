import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Department} from 'app/app-core/models/department.model'

@Injectable({providedIn: 'root'})
export class DepartmentForm extends FormBuilder {
    get() {
        return this.group({
            name: ['', Validators.required],
            school_year_id: ['', Validators.required],
        })
    }

    set(department: Department) {
        return this.group({
            name: [department.name, Validators.required],
            school_year_id: [department.school_year.id, Validators.required],
        })
    }
}
