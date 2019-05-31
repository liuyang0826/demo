import { define, WeElement, html, createRef, classNames } from './omi.esm.js'
define('i-calendar', class extends WeElement {

  static css = `table {width: 100%;}`

  myRef = createRef()

  render (props) {
    const className = classNames(props, 'o-my-class', { 'other-class': false, 'other-class-b': this.xxx === 1 })
    return html`
<table>
<tbody>
<th>
<td></td></th>
</tbody>
</table>  
        `
  }
})
