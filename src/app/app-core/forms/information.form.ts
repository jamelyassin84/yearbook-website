import {Validators} from '@angular/forms'
import {Information} from '../models/information.model'

export const DEFAULT_INFORMATION_FORM = {
    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    suffix: [''],
    barangay: ['', Validators.required],
    municipality: ['', Validators.required],
    province: ['Iloilo', Validators.required],
    picture: [null],
    award: [''],
    description: ['', Validators.required],
}

export const populateInformation = (information: Information) => {
    return {
        first_name: [information.first_name, Validators.required],
        middle_name: [information.middle_name],
        last_name: [information.last_name, Validators.required],
        suffix: [information.suffix],
        barangay: [information.barangay, Validators.required],
        municipality: [information.municipality, Validators.required],
        province: [information.province, Validators.required],
        picture: [information.picture],
        award: [information.award, Validators.required],
        description: [information.description, Validators.required],
    }
}
