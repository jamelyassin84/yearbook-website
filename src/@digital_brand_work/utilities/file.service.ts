import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {Injectable} from '@angular/core'
import {NodeResponse, PHPFile} from '@digital_brand_work/models/core.model'
import {FileApi} from 'app/app-core/http/api/file.api'

@Injectable({providedIn: 'root'})
export class FileService {
    constructor(private _fileAPI: FileApi) {}

    getFile(event: HTMLInputEvent): File | FileList {
        if (event.target.files && event.target.files.length === 1) {
            return event.target.files[0]
        }
        return event.target.files
    }

    upload(file: File): Observable<PHPFile> {
        let form = new FormData()
        form.append('file', file)

        return this._fileAPI.post(form)
    }

    async getPreviewURL<T>(file: T): Promise<Preview | Preview[]> {
        return new Promise((resolve) => {
            const reader = new FileReader()

            if ((file as any).length === 0) {
                let urls = []

                Array.from(file as any).forEach(() => {
                    reader.onload = () => {
                        urls.push(reader.result)
                    }

                    resolve(urls)
                })
            }
            reader.readAsDataURL(file as any)

            reader.onload = () => {
                resolve(reader.result)
            }
        })
    }
}

export type Preview = string | ArrayBuffer

export interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}
