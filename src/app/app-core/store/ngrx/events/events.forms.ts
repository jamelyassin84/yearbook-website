import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {SchoolEvent} from 'app/app-core/models/event.model'

@Injectable({providedIn: 'root'})
export class SchoolEventForm extends FormBuilder {
    get() {
        return this.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            date: ['', Validators.required],
            school_year_id: ['', Validators.required],
        })
    }

    set(schoolEvent: SchoolEvent) {
        return this.group({
            name: [schoolEvent.name, Validators.required],
            description: [schoolEvent.description, Validators.required],
            date: [schoolEvent.date, Validators.required],
            school_year_id: [schoolEvent.school_year.id, Validators.required],
        })
    }
}
