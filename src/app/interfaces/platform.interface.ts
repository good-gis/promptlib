import {PlatformKey} from '../enums/platform-key.enum';

export interface Platform {
  key: PlatformKey;
  label: string;
  /** Если можем префиллить prompt через URL-шаблон — укажем {prompt} как плейсхолдер. */
  urlTemplate?: string;
  /** Если префилл недоступен, просто откроем базовый URL, а текст уже в буфере. */
  baseUrl?: string;
}
