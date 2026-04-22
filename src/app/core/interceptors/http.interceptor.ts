import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoadingService);

  loader.show();

  return next(req).pipe(
    catchError((error) => {
      const message =
        error?.error?.message ||
        error?.message ||
        'Unexpected error occurred';

      alert(message);

      return throwError(() => error);
    }),
    finalize(() => loader.hide())
  );
};