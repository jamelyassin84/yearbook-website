import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {InformationTypeEum} from 'app/app-core/enums/information-type.enum'
import {
    DEFAULT_INFORMATION_FORM,
    populateInformation,
} from 'app/app-core/forms/information.form'
import {Student} from 'app/app-core/models/student.model'

@Injectable({providedIn: 'root'})
export class StudentForm extends FormBuilder {
    get() {
        return this.group({
            course_id: ['', Validators.required],
            department_id: ['', Validators.required],
            school_year_id: ['', Validators.required],
            section_id: ['', Validators.required],

            type: [InformationTypeEum.STUDENT],
            ...DEFAULT_INFORMATION_FORM,
        })
    }

    set(student: Student) {
        return this.group({
            course_id: [student.course.id, Validators.required],
            department_id: [student.department.id, Validators.required],
            school_year_id: [student.school_year.id, Validators.required],
            section_id: [student.section.id, Validators.required],
            information_id: [student.information.id, Validators.required],

            type: [InformationTypeEum.STUDENT],
            ...populateInformation(student.information),
        }) as any
    }
}
