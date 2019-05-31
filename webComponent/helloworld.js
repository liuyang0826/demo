(function () {
  class HelloWorld extends HTMLElement {
    constructor () {

      super()

      const template = document
      .getElementById('hello-world')
      .content

      this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true))
    }

    // 添加
    connectedCallback () {
      console.log(this)
    }

    // 移除
    disconnectedCallback () {
    }

    // 属性修改
    attributeChangedCallback () {
    }
  }

  customElements.define('hello-world', HelloWorld)
})()
