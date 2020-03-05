import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Message } from 'primeng/api';
import { MessageType } from '../base/model/message-type.enum';

export class HttpClientUtils {
  //TO-DO Remove any type
  public static prepareOptions(options: any = {}, paramObj?: any): any {
    const output = {
      ...options,
      observe: "response",
      responseType: 'json',
      withCredentials: true
    };

    output.params = HttpClientUtils.addQueryParamFromObject(paramObj, options);

    return output;
  }


  public static addQueryParamFromObject(obj: any,
    options: any): HttpParams {
    let params = options.params ? options.params : new HttpParams();
    if (obj) {
      Object.keys(obj)
        .forEach(
          key => {
            if (obj[key] instanceof Array) {
              obj[key].forEach(
                element => {
                  params = params.append(key, element);
                });

            } else {
              params = params.append(key, obj[key]);
            }
          });
    }

    return params;
  }

  public static prepareFormData(obj: any,
    form?: any): FormData {
    let formParams: FormData = form ? form : new FormData();
    if (obj) {
      Object.keys(obj)
        .forEach(
          key => {
            if (obj[key] instanceof Array) {
              obj[key].forEach(
                element => {
                  formParams.append(key, element);
                });

            } else {
              formParams.append(key, obj[key]);
            }
          });
    }
    return formParams;
  }

  public static getAllErrorMessages(response: HttpErrorResponse) {
    let messages: Array<Message> = [];
   //TO-DO : Talk with the be about this :D on how thay manage the messages :D
    return messages;
  }
}
