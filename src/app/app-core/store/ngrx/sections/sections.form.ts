import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Section} from 'app/app-core/models/section.model'

@Injectable({providedIn: 'root'})
export class SectionForm extends FormBuilder {
    get() {
        return this.group({
            department_id: ['', Validators.required],
            school_year_id: ['', Validators.required],
            course_id: ['', Validators.required],
            name: ['', Validators.required],
        })
    }

    set(section: Section) {
        return {
            department_id: section.department.id,
            school_year_id: section.school_year.id,
            course_id: section.course.id,
            name: section.name,
        }
    }
}
