import {Component, inject, Input} from '@angular/core';
import {TuiCard, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {TuiAlertService, TuiAppearance, TuiButton, TuiDialog, TuiHintDirective, TuiTitle} from '@taiga-ui/core';
import {TuiBadge, TuiCopyComponent} from '@taiga-ui/kit';
import {Platform} from '../../../interfaces/platform.interface';

@Component({
  selector: 'app-prompt-item',
  standalone: true,
  imports: [
    TuiCard,
    TuiAppearance,
    TuiHeader,
    TuiTitle,
    TuiButton,
    TuiCopyComponent,
    TuiHintDirective,
    TuiDialog,
    TuiForm,
    TuiBadge
  ],
  templateUrl: './prompt-item.html',
  styleUrls: ['./prompt-item.less'],
})
export class PromptCardComponent {
  @Input() title = '';
  @Input() prompt = '';
  @Input() forDevs = false;
  @Input() platform: Platform | null = null;

  private readonly alerts = inject(TuiAlertService);
  protected open = false;
  showGptLink = false;

  async copy(prompt: string) {
    await navigator.clipboard.writeText(prompt);

    this.alerts
      .open('Скопировано', {appearance: 'positive'})
      .subscribe();
  }

  openDialog() {
    this.open = !this.open;
  }
}
