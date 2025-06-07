import { Injectable } from '@angular/core';

export interface location {
  [key: string]: {
    [key: string]: {
      en: string;
      es: string;
    }
  }
}
export interface keyword {
  [key: string]: {
    name: {
      en: string | string[];
      es: string | string[];
    },
    color: string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class ToolsService {
  keywordsDic: keyword = {}
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

  getABSText(value: string): string {
    return value.normalize('NFD').replace(/\p{Diacritic}/gu, '')
  }

  getIsNumber(value: any): boolean {
    return typeof value === "number" || Number.isNaN(value)
  }

  getFormattedCode(code: string): Array<{ line: string, blockState: string, currentBlock: string[] }> {
    const lines = code.split('<br/>')
    const blockStack: string[] = []
    const result: Array<{ line: string, blockState: string, currentBlock: string[] }> = []
    const endKeywords: string[] = this.keywordsDic["end"].name[this.lang] as string[]
    const endPattern = `^(${endKeywords.join('|')})\\s+(\\w+);$`

    lines.forEach(line => {
      if (line === '') {
        return
      }

      const blockStartMatch = line.match(/^(\w+)\s*.*:$/)
      const blockEndMatch = line.match(new RegExp(endPattern))
      const blockState = blockStartMatch ? "start" : blockEndMatch ? "end" : blockStack.length > 0 ? "inside" : "outside"

      if (blockStartMatch) {
        blockStack.push(blockStartMatch[1])
      }

      if (blockStack.length > 0) {
          result.push({
            line: line,
            blockState: blockState,
            currentBlock: [...blockStack]
          })
      } else {
          result.push({
            line: line,
            blockState: blockState,
            currentBlock: []
          })
      }

      if (blockEndMatch) {
        const blockType = blockEndMatch[2];
        if (blockStack.length > 0 && blockStack[blockStack.length - 1] === blockType) {
          blockStack.pop()
        }
      }
    })
    return result
  }

}
