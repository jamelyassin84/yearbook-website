import {ChangeDetectorRef, Directive, ElementRef} from '@angular/core'

@Directive({
    selector: '[autoFocus]',
})
export class AutoFocusDirective {
    constructor(
        private _cdr: ChangeDetectorRef,
        private elementRef: ElementRef<HTMLInputElement>,
    ) {
        this._cdr.detach()
    }

    ngAfterViewInit(): void {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }

        setTimeout(() => {
            this.elementRef.nativeElement.focus()

            this._cdr.detectChanges()
        }, 1500)
    }

    ngOnDestroy(): void {
        this._cdr.detach()
    }
}
