import { Injectable } from '@angular/core';

export interface location {
  [key: string]: {
    [key: string]: {
      en: string;
      es: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})

export class ToolsService {
  keywordsDic: Object = {}
  lang: 'en' | 'es' = 'en'
  locations: location | null = null

  constructor() {}

  async loadJSON(jsonFile: string): Promise<any> {
  try {
    const response = await fetch(`${jsonFile}.json`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error loading JSON file:', error)
    alert('Error loading JSON file: ' + error)
    return null
  }
}

  changeLanguage(): void {
    this.lang = this.lang === 'en' ? 'es' : 'en'
  }
}
