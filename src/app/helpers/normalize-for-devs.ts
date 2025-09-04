import {PromptRow} from '../interfaces/prompt-row.interface';

export function normalizeForDevs(val: PromptRow['for_devs']): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val === 1;
  if (val == null) return false;
  const s = String(val).trim().toLowerCase();
  return s === '1' || s === 'true' || s === 'yes' || s === 'y';
}




