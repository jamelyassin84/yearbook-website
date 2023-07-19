import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {InformationTypeEum} from 'app/app-core/enums/information-type.enum'
import {
    DEFAULT_INFORMATION_FORM,
    populateInformation,
} from 'app/app-core/forms/information.form'
import {Faculty} from 'app/app-core/models/faculty.model'

@Injectable({providedIn: 'root'})
export class FacultyForm extends FormBuilder {
    get() {
        return this.group({
            department_id: ['', Validators.required],
            school_year_id: ['', Validators.required],
            title: ['', Validators.required],
            position: ['', Validators.required],
            type: [InformationTypeEum.FACULTY],

            ...DEFAULT_INFORMATION_FORM,
        })
    }

    set(faculty: Faculty) {
        return this.group({
            department_id: [faculty.department.id, Validators.required],
            school_year_id: [faculty.school_year.id, Validators.required],
            information_id: [faculty.information.id, Validators.required],
            title: [faculty.title, Validators.required],
            position: [faculty.position, Validators.required],
            type: [InformationTypeEum.FACULTY],

            ...populateInformation(faculty.information),
        }) as any
    }
}
