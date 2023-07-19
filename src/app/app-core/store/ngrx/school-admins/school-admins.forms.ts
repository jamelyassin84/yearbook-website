import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {InformationTypeEum} from 'app/app-core/enums/information-type.enum'
import {
    DEFAULT_INFORMATION_FORM,
    populateInformation,
} from 'app/app-core/forms/information.form'
import {SchoolAdmin} from 'app/app-core/models/school-admin.model'

@Injectable({providedIn: 'root'})
export class SchoolAdminForm extends FormBuilder {
    get() {
        return this.group({
            school_year_id: ['', Validators.required],
            type: [InformationTypeEum.SCHOOL_ADMIN],
            title: ['', Validators.required],
            position: ['', Validators.required],
            ...DEFAULT_INFORMATION_FORM,
        })
    }

    set(schoolAdmin: SchoolAdmin) {
        return this.group({
            school_year_id: [schoolAdmin.school_year.id, Validators.required],
            information_id: [schoolAdmin.information.id, Validators.required],
            title: [schoolAdmin.title, Validators.required],
            position: [schoolAdmin.position, Validators.required],
            type: [InformationTypeEum.SCHOOL_ADMIN],
            ...populateInformation(schoolAdmin.information),
        }) as any
    }
}
