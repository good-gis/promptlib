export interface PromptRow {
  title: string;
  prompt: string;
  for_devs: boolean | 'true' | 'false' | 1 | 0 | string;
}
