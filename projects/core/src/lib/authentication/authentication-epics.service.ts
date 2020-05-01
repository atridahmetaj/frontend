import { merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationEpics } from './redux/authentication.epics';

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationEpicsService {
    constructor(
        private authenticationEpics: AuthenticationEpics
    ) { }

    combineEpic = (action$, state$) => merge(
      this.authenticationEpics.combineEpic(action$, state$),

    )
  }
