import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import {PromptRow} from '../interfaces/prompt-row.interface';
import {normalizeForDevs} from '../helpers/normalize-for-devs';

function assetUrl(relative: string): string {
  return new URL(relative, document.baseURI).toString();
}

@Injectable({ providedIn: 'root' })
export class PromptService {
  private http = inject(HttpClient);

  loadCsv$(path: string = assetUrl('prompts.csv')): Observable<PromptRow[]> {
    return this.http.get(path, { responseType: 'text' }).pipe(
      map(csvText =>
        Papa.parse<PromptRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: h => h.trim(),
        })
      ),
      tap(parsed => {
        if (parsed.errors?.length) {
          console.warn('CSV parse warnings:', parsed.errors);
        }
      }),
      map(parsed =>
        (parsed.data ?? [])
          .filter(r => r && (r.title || r.prompt))
          .map(r => ({
            title: (r.title ?? '').trim(),
            prompt: (r.prompt ?? '').trim(),
            for_devs: normalizeForDevs(r.for_devs),
          }))
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError(err => {
        console.error('Failed to load/parse CSV:', err);
        return throwError(() => err);
      })
    );
  }
}
