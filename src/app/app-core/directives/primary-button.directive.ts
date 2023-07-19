import {LoadingStateEnum} from './../../../@digital_brand_work/enums/loading-state.enum'
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
} from '@angular/core'
import {MatRipple} from '@angular/material/core'

@Directive({
    selector: '[primaryButton]',
})
export class PrimaryButtonDirective {
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private _cdr: ChangeDetectorRef,
    ) {}

    @Input('loader')
    set setLoading(loader: LoadingStateEnum) {
        this.removeClasses()

        if (loader === LoadingStateEnum.FAILED) {
            this.failedButtonDesign()
            this._cdr.detectChanges()
            return
        }

        if (loader === LoadingStateEnum.SUCCEEDED) {
            this.succeededButtonDesign()
            this._cdr.detectChanges()
            return
        }

        if (loader === LoadingStateEnum.LOADING) {
            this.loadingButtonDesign()
            this._cdr.detectChanges()
            return
        }

        if (loader === LoadingStateEnum.IDLE) {
            this.idleButtonDesign()
            this._cdr.detectChanges()
            return
        }
    }

    @Input()
    disabled: boolean

    ngOnChanges() {
        this._renderer.addClass(this._elementRef.nativeElement, 'transition-1s')

        if (this.disabled) {
            this._renderer.addClass(
                this._elementRef.nativeElement,
                'pointer-events-none',
            )

            return
        }

        this._renderer.removeClass(
            this._elementRef.nativeElement,
            'pointer-events-none',
        )
    }

    ngOnDestroy(): void {
        this._cdr.detach()
    }

    loadingButtonDesign() {
        return [
            'pointer-events-none',
            'border-gray-200',
            'text-black',
            'bg-gray-50',
        ].forEach((list) => {
            this._renderer.addClass(this._elementRef.nativeElement, list)
        })
    }

    failedButtonDesign() {
        return [
            'pointer-events-none',
            'bg-red-500',
            'text-white',
            'border-transparent',
        ].forEach((list) => {
            this._renderer.addClass(this._elementRef.nativeElement, list)
        })
    }

    succeededButtonDesign() {
        return [
            'pointer-events-none',
            'border-emerald-400',
            'border',
            'bg-transparent',
        ].forEach((list) => {
            this._renderer.addClass(this._elementRef.nativeElement, list)
        })
    }

    idleButtonDesign() {
        return [
            'text-white',
            'border-teal-primary',
            'md:hover:bg-teal-primary-darker',
            'bg-teal-primary',
        ].forEach((list) => {
            this._renderer.addClass(this._elementRef.nativeElement, list)
        })
    }

    removeClasses() {
        return [
            'pointer-events-none',
            'border-gray-200',
            'text-gray-400',

            'bg-red-500',
            'bg-emerald-500',
            'text-white',
            'bg-white',
            'bg-transparent',

            'border-teal-primary',
            'bg-teal-primary',
            'md:hover:bg-teal-primary-darker',
        ].forEach((list) => {
            this._renderer.removeClass(this._elementRef.nativeElement, list)
        })
    }
}
