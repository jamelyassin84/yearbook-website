import {Component, EventEmitter, Input, Output} from '@angular/core'

@Component({
    selector: 'modal-header',
    template: `
        <div class="flex items-center w-full p-5">
            <div>
                <div class="text-3xl semi-font-bold">{{ modalTitle }}</div>
                <div>{{ subTitle }}</div>
            </div>

            <button
                class="ml-auto"
                mat-icon-button
                matTooltip="Close"
                (click)="onClose.emit()"
            >
                <mat-icon svgIcon="feather:x" />
            </button>
        </div>
    `,
})
export class ModalHeaderComponent {
    @Output()
    onClose = new EventEmitter()

    @Input({required: true})
    modalTitle: string

    @Input()
    subTitle?: string
}
