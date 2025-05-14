import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { ToolsService } from './services/tools.service'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatGridListModule, MatCardModule]
})
export class AppComponent implements OnInit {
  inputText: string = ''
  highlightedText: string = ''
  cleanHighlightedText: SafeHtml | null = null

  constructor(public tools: ToolsService, private sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    this.tools.keywordsDic = await this.tools.loadJSON('dictionary')
    this.tools.locations = await this.tools.loadJSON('locations')
    await console.log('Data: ' + this.tools.keywordsDic)
  }

  highlightWords(text: string): void {
    text = text.replace(/;/g, ';<br/>')
    Object.values(this.tools.keywordsDic).forEach((keywordObj: any) => {
      const names = keywordObj.name[this.tools.lang]
      const words = Array.isArray(names) ? names : [names]
      const color = keywordObj.color

      words.forEach(word => {
        const regex = new RegExp(`\\b(${word})\\b`, 'gi')
        text = text.replace(regex, `<span style="color: rgb(${color})">$1</span>`)
      })
    })
    this.highlightedText = text
    this.cleanHighlightedText = this.sanitizer.bypassSecurityTrustHtml(this.highlightedText)
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLDivElement
    this.inputText = target.textContent ?? ''
    console.log(this.inputText)
    this.highlightWords(this.inputText)
  }

  convertCode(): void {
    alert('Function not implemented yet!')
  }

  changeLanguage(): void {
    this.tools.lang = this.tools.lang === 'en' ? 'es' : 'en'
    this.highlightWords(this.inputText)
  }
}
