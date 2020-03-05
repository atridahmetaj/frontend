
import { Observable } from "rxjs";
import { HttpClient, HttpEvent } from "@angular/common/http";

import { BaseEntityModel } from "../model/base-entity.model";
import { HttpClientUtils } from "../../utils/http-client.utils";

export abstract class BaseEntityService<
  Entity extends BaseEntityModel
> {
  public abstract baseUrl: string;

  constructor(public http: HttpClient) {}

  public searchAsync(): Observable<HttpEvent<Array<Entity>>> {
    return this.http.get<Array<Entity>>(
      this.baseUrl,
      HttpClientUtils.prepareOptions()
    );
  }

  public createAsync(entity: Entity): Observable<HttpEvent<string>> {
    return this.http.post<string>(
      this.baseUrl,
      entity,
      HttpClientUtils.prepareOptions()
    );
  }

  public readAsync(id: string): Observable<HttpEvent<Entity>> {
    const url = this.baseUrl + `/${id}`;
    return this.http.get<Entity>(url, HttpClientUtils.prepareOptions());
  }

  public deleteAsync(id: string): Observable<HttpEvent<void>> {
    const url = this.baseUrl + `/${id}`;
    return this.http.delete<void>(url, HttpClientUtils.prepareOptions());
  }

  public updateAsync(entity: Entity): Observable<HttpEvent<void>> {
    return this.http.put<void>(
      this.baseUrl,
     entity,
      HttpClientUtils.prepareOptions()
    );
  }
}
