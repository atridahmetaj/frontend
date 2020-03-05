import { Injectable } from "@angular/core";
import { merge } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReduxEpicsService {
  constructor(
  ) {}

  combineEpic = (action$, state$) =>
    merge(
      //TO-DO Create an redux epic service for each feature app module   :D.
    );
}
