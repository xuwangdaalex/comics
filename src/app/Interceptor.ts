import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {
      let apiUrl = "https://jsonplaceholder.typicode.com/albums";

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
          .pipe(mergeMap(handleRoute))
          .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
          .pipe(delay(500))
          .pipe(dematerialize());

          function handleRoute() {
            switch (true) {
                case url.endsWith('api/character'):
                  console.log('11ok');
                  return ok({ "userId": 99, "id": 999, "title": "enim repellat iste" });
                //     return register();
                // case url.endsWith('/users/authenticate') && method === 'POST':
                //     return authenticate();
                // case url.endsWith('/users') && method === 'GET':
                //     return getUsers();
                // case url.match(/\/users\/\d+$/) && method === 'GET':
                //     return getUserById();
                // case url.match(/\/users\/\d+$/) && method === 'DELETE':
                //     return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }
    }
}
