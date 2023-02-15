import { writable } from 'svelte/store';
import type { SavedCity } from '../types/Geo';
import type { WeatherData } from '../types/Weather';

export const weatherData = writable<WeatherData | undefined>();
export const weatherStatus = writable<'untouched' | 'loading' | 'error' | 'success'>('untouched');

export const savedCities = writable<SavedCity[]>([]);