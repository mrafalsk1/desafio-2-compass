class View {
    constructor(elemento) {
        this._elemento = elemento
    }
    template() {
        throw new Error('Template method not implemented yet')
    }
    update(data) {
        if (this._elemento)
            this._elemento.innerHTML = this.template(data)
    }
}