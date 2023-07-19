import {Component, EventEmitter, Input, Output} from '@angular/core'
import {FormGroup} from '@angular/forms'
import {HTMLInputEvent} from '@digital_brand_work/models/core.model'
import {FileService, Preview} from '@digital_brand_work/utilities/file.service'

@Component({
    selector: 'information',
    templateUrl: './information.component.html',
})
export class InformationComponent {
    constructor(private _fileService: FileService) {}

    @Output()
    onImageUploaded = new EventEmitter<string>()

    @Input('form')
    set setForm(form: FormGroup) {
        if (form.value.picture) {
            this.previewImage = form.value.picture
        }
        this.form = form
    }
    form: FormGroup

    previewImage: Preview | 'loading'

    async onDrop(event: FileList) {
        this.upload(event[0])
    }

    async onFileRead(event: HTMLInputEvent) {
        const file = this._fileService.getFile(event) as File

        if (file) {
            this.upload(file)
        }
    }

    async upload(originalFile: File) {
        this.previewImage = 'loading'
        this.previewImage = (await this._fileService.getPreviewURL(
            originalFile,
        )) as Preview

        this._fileService.upload(originalFile).subscribe((file) => {
            this.onImageUploaded.emit(file.url)
        })
    }
}
