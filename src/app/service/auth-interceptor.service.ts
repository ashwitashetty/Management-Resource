import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Sending rqst intercepter");
    let updatedRequest = req.clone({
      headers: req.headers.append("x-api-key", "secrt-dev-1505"),
    });
    return next.handle(updatedRequest).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("9999", event.body);
        }
      })
    );
  }
}
