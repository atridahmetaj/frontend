import { Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { AuthenticationEpicsService } from '@ms-system/core';

@Injectable({
  providedIn: 'root'
})
export class ReduxEpicsService {
  constructor(
    // private adminEpics: AdminEpicsService,
    private authEpics: AuthenticationEpicsService
  ) {}

  combineEpic = (action$, state$) =>
    merge(
      // this.adminEpics.combineEpic(action$, state$),
      this.authEpics.combineEpic(action$, state$)
    )
}
