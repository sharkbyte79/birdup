import {HttpInterceptorFn} from '@angular/common/http';

export const apiBasePathInterceptor: HttpInterceptorFn = (req, next) => {
  // TODO: replace with basepath out of env ASAP
  const apiReq = req.clone({url: `http://localhost:80/api/v1/${req.url}`});
  return next(apiReq);
};
