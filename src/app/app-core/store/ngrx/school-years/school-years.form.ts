import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {SchoolYear} from 'app/app-core/models/school-year.model'

@Injectable({providedIn: 'root'})
export class SchoolYearForm extends FormBuilder {
    get() {
        return this.group({
            name: ['', Validators.required],
        })
    }

    set(schoolYear: SchoolYear) {
        return this.group({
            name: [schoolYear.name, Validators.required],
        })
    }
}
