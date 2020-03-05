
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { CommonsModule } from '@ms-system/commons';

@NgModule({
    imports: [CommonModule, CommonsModule],
    exports: [],
    declarations: [ErrorComponent, NotFoundComponent],
    providers: [],
})
export class ExceptionModule { }
