import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {FuseValidators} from '@fuse/validators'
import {Admin} from 'app/app-core/models/admin.model'

@Injectable({providedIn: 'root'})
export class AdminForm extends FormBuilder {
    get() {
        return this.group(
            {
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'confirmPassword',
                ),
            },
        )
    }

    set(admin: Admin) {
        return this.group(
            {
                name: [admin.name, Validators.required],
                email: [admin.email, [Validators.required, Validators.email]],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: FuseValidators.mustMatch(
                    'password',
                    'confirmPassword',
                ),
            },
        )
    }
}
