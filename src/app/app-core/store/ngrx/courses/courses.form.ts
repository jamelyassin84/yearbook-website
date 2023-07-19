import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Course} from 'app/app-core/models/course.model'

@Injectable({providedIn: 'root'})
export class CourseForm extends FormBuilder {
    get() {
        return this.group({
            name: ['', Validators.required],
            department_id: ['', Validators.required],
            school_year_id: ['', Validators.required],
        })
    }

    set(course: Course) {
        return this.group({
            name: [course.name, Validators.required],
            department_id: [course.department.id, Validators.required],
            school_year_id: [course.school_year.id, Validators.required],
        })
    }
}
