const createWrapper = (name) => {
  return (child, options) => {
    const wrapper = document.createElement(name)

    if (typeof options === 'object') {
      Object.entries(options).forEach(([key, value]) => {
        wrapper.setAttribute(key, value)
      })
    }

    if (!child) return wrapper
    if (typeof child === 'string') wrapper.innerHTML = child
    if (typeof child === 'object' && child.length === undefined)
      wrapper.appendChild(child)
    if (typeof child === 'object' && child.length !== undefined)
      wrapper.append(...child)

    const aditions = {
      toStr: function () {
        return this.outerHTML
      },
    }

    return Object.assign(wrapper, aditions)
  }
}

export const link = createWrapper('a')
