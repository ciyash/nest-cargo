import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, expand, filter, map, reduce } from 'rxjs';
import { environment } from 'src/environments/environment';
import { REPORTS, mergeReportPages, nextReportPage } from './report-pages';
@Injectable()
export class ReportInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const base = environment.baseUrl.replace(/\/+$/, '') + '/';
    const url = req.url.split('?')[0];
    const endpoint = url.startsWith(base) ? url.slice(base.length) : '';
    const config = REPORTS[endpoint];
    // Explicitly paginated consumers (including the dashboard) keep the API envelope.
    const explicit = req.params.has('page') || req.params.has('limit') || /[?&](page|limit)=/.test(req.url) || req.body?.page !== undefined || req.body?.limit !== undefined;
    if (!config || explicit || !['GET','POST'].includes(req.method)) return next.handle(req);
    const fetchPage = (page: number) => next.handle(req.clone({setParams:{page:String(page),limit:'100'}})).pipe(filter((event): event is HttpResponse<any> => event instanceof HttpResponse));
    const paths = endpoint === 'booking/consolidated-report-branch' ? [...config.paths,'deliverToPayDetails'] : config.paths;
    return fetchPage(1).pipe(expand(response => {
      const page = nextReportPage(response.body);
      if (page !== null && page <= response.body?.pagination?.page) throw new Error('Report pagination did not advance');
      return page === null ? EMPTY : fetchPage(page);
    }), reduce((previous: HttpResponse<any> | null, response: HttpResponse<any>) => response.clone({body: mergeReportPages(previous?.body,response.body,paths)}), null), map(response => {
      if (!response) throw new Error('Empty report response');
      return config.raw ? response.clone({body:response.body?.data || []}) : response;
    }));
  }
}
