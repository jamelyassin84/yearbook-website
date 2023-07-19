import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {InformationTypeEum} from 'app/app-core/enums/information-type.enum'
import {
    DEFAULT_INFORMATION_FORM,
    populateInformation,
} from 'app/app-core/forms/information.form'
import {Staff} from 'app/app-core/models/staff.model'

@Injectable({providedIn: 'root'})
export class StaffForm extends FormBuilder {
    get() {
        return this.group({
            school_year_id: ['', Validators.required],
            title: ['', Validators.required],
            position: ['', Validators.required],
            type: [InformationTypeEum.STAFF],

            ...DEFAULT_INFORMATION_FORM,
        })
    }

    set(staff: Staff) {
        return this.group({
            school_year_id: [staff.school_year.id, Validators.required],
            title: [staff.title, Validators.required],
            position: [staff.position, Validators.required],
            information_id: [staff.information.id, Validators.required],
            type: [InformationTypeEum.STAFF],

            ...populateInformation(staff.information),
        }) as any
    }
}
