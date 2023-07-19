import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {FuseValidators} from '@fuse/validators'

@Injectable({providedIn: 'root'})
export class AuthForm extends FormBuilder {
    get() {
        return this.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        })
    }
}
