import { TuiRoot } from "@taiga-ui/core";
import {Component, inject, OnInit, signal} from '@angular/core';
import {PromptService} from './services/prompt.service';
import {Search} from './components/search/search';
import {PromptList} from './components/prompt-list/prompt-list';
import {AsyncPipe} from '@angular/common';
import {PlatformKey} from './enums/platform-key.enum';
import {toObservable} from '@angular/core/rxjs-interop';
import {combineLatest, startWith} from 'rxjs';
import {map} from 'rxjs/operators';
import {PromptRow} from './interfaces/prompt-row.interface';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, Search, PromptList, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App {
  public readonly promptService = inject(PromptService);
  private readonly prompts$ = this.promptService.loadCsv$();

  private readonly search = signal<string>('');      // строка поиска
  private readonly hideDevs = signal<boolean>(false); // true -> скрываем dev

  private readonly search$ = toObservable(this.search).pipe(startWith(''));
  private readonly hideDevs$ = toObservable(this.hideDevs).pipe(startWith(false));

  readonly filteredPrompts$ = combineLatest([
    this.prompts$,
    this.search$,
    this.hideDevs$,
  ]).pipe(
    map(([rows, query, hideDevs]) => this.filterRows(rows, query, hideDevs)),
  );


  onPlatformChanged($event: PlatformKey | null) {
    console.log('onPlatform changed', $event);
  }

  onSearchChange(value: string) {
    this.search.set(value ?? '');
  }

  onShowDevPromptChange(hide: boolean) {
    this.hideDevs.set(hide);
  }


  private filterRows(rows: PromptRow[], queryRaw: string, hideDevs: boolean): PromptRow[] {
    const q = (queryRaw ?? '').trim().toLowerCase();
    return rows.filter(r => {
      if (hideDevs && r.for_devs) return false;
      if (!q) return true;

      const title = (r.title ?? '').toLowerCase();
      const prompt = (r.prompt ?? '').toLowerCase();
      return title.includes(q) || prompt.includes(q);
    });
  }
}
