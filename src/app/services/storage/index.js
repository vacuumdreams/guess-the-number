import adapter from "./adapter"

const serviceStorage = adapter(localStorage)

export {serviceStorage}
