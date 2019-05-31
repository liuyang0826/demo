import { define, WeElement, html, createRef, classNames } from './omi.esm.js'
define('i-select', class extends WeElement {

  static css = `span{color: red;}`

  static observe = true

  data = {
    count: 1
  }

  xxx = 1

  sub = () => {
    this.data.count--
  }

  add = () => {
    this.data.count++
  }

  myRef = createRef()

  render (props) {
    const className = classNames(props, 'o-my-class', { 'other-class': false, 'other-class-b': this.xxx === 1 })
    return html`
        <div class="${className}">
          <button onClick=${this.sub}>-</button>
          <span ref=${this.myRef}>${this.data.count}</span>
          <button onClick=${this.add}>+</button>
          <slot></slot>
        </div>
        `
  }
})
