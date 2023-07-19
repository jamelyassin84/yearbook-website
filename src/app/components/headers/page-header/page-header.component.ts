import {Component, Input} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'

@Component({
    selector: 'page-header',
    animations: [...dbwAnimations],
    template: `
        <div
            @slideInTop
            class="flex flex-col md:flex-row p-5 mb-4 bg-white rounded-md   md:items-center"
        >
            <div>
                <div class="text-3xl font-bold">{{ headerTitle }}</div>
                <div class="text-gray-500">
                    {{ subtitle }}
                </div>
            </div>

            <div class="md:ml-auto md:mt-0 mt-5">
                <div [ngTemplateOutlet]="template"></div>
            </div>
        </div>
    `,
})
export class PageHeaderComponent {
    @Input({required: true})
    headerTitle: string

    @Input({required: true})
    subtitle: string

    @Input({required: false})
    template?: any
}
