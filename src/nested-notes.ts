export type NestedNodeParams = {
  id: string,
  name: string,
  text?: string,
  placeholder?: string,
  onClose?: (e: Event) => void,
}

export class NestedNote {
  wrapper: HTMLDivElement
  details: HTMLDetailsElement
  summary: HTMLElement
  nameSpan: HTMLSpanElement
  iconsDiv: HTMLDivElement
  textarea: HTMLTextAreaElement

  onClose?: (e: Event) => void

  constructor(params: NestedNodeParams) {
    this.details = document.createElement('details')
    this.details.open = true
  
    this.summary = document.createElement('summary')
    this.details.append(this.summary)
  
    this.nameSpan = document.createElement('span')
    this.nameSpan.textContent = params.name
    this.summary.append(this.nameSpan)
    
    this.iconsDiv = document.createElement('div')
    this.iconsDiv.className = 'icons'
    this.summary.append(this.iconsDiv)

    this.addIcon('🗑️', e => {
      this.details.remove()
      this.onClose?.(e)
    })

    this.textarea = document.createElement('textarea')
    if(params?.placeholder) this.textarea.placeholder = params.placeholder
    if(params?.text) this.textarea.value = params.text
    this.details.append(this.textarea)

    this.wrapper = document.createElement('div')
    this.wrapper.className = 'nested-note'
    this.wrapper.append(this.details)
  }

  addIcon(emoji: string, onclick: (e: Event) => void) {
    const icon = document.createElement('div')
    icon.textContent = emoji
    icon.addEventListener('click', onclick)
    this.iconsDiv.append(icon)
    return icon
  }
}

// @ts-ignore
window.NestedNode = NestedNote