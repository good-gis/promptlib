import {Component, Input} from '@angular/core';
import {PromptCardComponent} from './prompt-item/prompt-item';
import {PromptRow} from '../../interfaces/prompt-row.interface';

@Component({
  selector: 'app-prompt-list',
  imports: [
    PromptCardComponent,
  ],
  templateUrl: './prompt-list.html',
  styleUrl: './prompt-list.less'
})
export class PromptList {
  @Input() prompts: PromptRow[] | null = null;
}
