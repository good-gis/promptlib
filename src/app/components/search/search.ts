import {Component, EventEmitter, Output, signal} from '@angular/core';
import {TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {
  TuiSwitch,
  TuiTooltip
} from '@taiga-ui/kit';
import {PLATFORMS} from '../../configs/platforms.config';
import {PlatformKey} from '../../enums/platform-key.enum';

@Component({
  selector: 'app-search',
  imports: [
    FormsModule,
    TuiTextfield,
    TuiIcon,
    TuiTooltip,
    TuiSwitch,
    TuiButton
  ],
  templateUrl: './search.html',
  styleUrl: './search.less'
})
export class Search {
  selectedPlatform = signal<PlatformKey | null>(null);

  searchValue: string | null = null;
  hideDevs: boolean = false;
  protected readonly PLATFORMS = PLATFORMS;

  @Output() platform: EventEmitter<PlatformKey | null> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() showDevPrompt: EventEmitter<boolean> = new EventEmitter();
  showButtons: boolean = false;

  clickPlatform(key: PlatformKey): void {
    this.selectedPlatform.update(curr => {
      const next = curr === key ? null : key;
      this.platform.emit(next);
      return next;
    });
  }

}
