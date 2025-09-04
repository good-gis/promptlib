import {Platform} from '../interfaces/platform.interface';
import {PlatformKey} from '../enums/platform-key.enum';

export const PLATFORMS: Platform[] = [
  {
    key: PlatformKey.CHAT_GPT,
    label: 'ChatGPT',
    baseUrl: 'https://chat.openai.com/'
  },
  {
    key: PlatformKey.QWEN,
    label: 'Qwen',
    baseUrl: 'https://chat.qwenlm.ai/'
  },
  {
    key: PlatformKey.GIGA_CHAT,
    label: 'GigaChat',
    baseUrl: 'https://chat.gigachat.sber.ru/'
  },
  {
    key: PlatformKey.ALISA,
    label: 'YandexGPT',
    baseUrl: 'https://ya.ru/gpt'
  },
];
