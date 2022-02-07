
class ReceitaController {
    constructor() {
        this._inputValor = document.querySelector('#valor')
        this._inputNome = document.querySelector('#nome')
        this._inputDescricao = document.querySelector('#descricao')
        this._inputImagem = document.querySelector('#imagem')
        this._inputTempo = document.querySelector('#tempo')
        this.elementToast = document.querySelector('.toast')
        this.toastBody = document.querySelector('.toast-body')
        this.toast = new bootstrap.Toast(this.elementToast)
        this.section = document.querySelector('#wrap-form-receitas')
        this.modal = document.querySelector('#modal')
    }
    async adiciona(event) {
        event.preventDefault()
        const formData = new FormData()
        formData.append('nome', this._inputNome.value)
        formData.append('valor', this._inputValor.value)
        formData.append('descricao', this._inputDescricao.value)
        formData.append('imagem', this._inputImagem.files[0])
        formData.append('tempo', this._inputTempo.value)
        const response = await fetch('http://localhost:3000/recipes', {
            method: 'POST',
            body: formData,
        }).catch(err => this.handleError(err))
        if (response.err) {
            this.elementToast.classList.add('toast--error')
            this.toastBody.textContent = 'Ops, algo deu errado'
        } else {
            this.elementToast.classList.add('toast--success')
            this.toastBody.textContent = 'Receita enviada com sucesso!'
        }
        this.clearFields()
        this.toast.show()

    }
    handleError(err) {
        console.log(err);
        this.elementToast.classList.add('toast--error')
        this.toastBody.textContent = 'Servidor offline!'
        this.toast.show()
    }
    async listReceitas() {
        const receitasDiv = document.querySelector('#receitas-view')
        let response = ''
        if (receitasDiv.getAttribute('data-bs-most-seen')) {
            response = await fetch(`http://localhost:3000/recipes?mostClicked=true`).then(res => res.json()).catch(err => this.handleError(err))
        } else {
            response = await fetch(`http://localhost:3000/recipes`).then(res => res.json()).catch(err => this.handleError(err))
        }

        const result = []
        for await (const receita of response) {
            const data = await fetch(`http://localhost:3000/recipes/image/${receita.imagem.filename}`).then(res => res.blob()).catch(err => this.handleError(err))
            result.push({
                receita,
                urlImage: URL.createObjectURL(data)
            })
        }
        this._receitasView = new ReceitasView(document.querySelector('#receitas-view'));
        this._receitasView.update(result)
        this.eventOpenModal()
        return response
    }
    async eventOpenModal() {
        this.modal.addEventListener('show.bs.modal', async function (event) {
            var recipeid = event.relatedTarget.getAttribute('data-bs-recipeId')
            const receita = await fetch(`http://localhost:3000/recipes/${recipeid}`).then(res => res.json()).catch(err => this.handleError(err))
            const data = await fetch(`http://localhost:3000/recipes/image/${receita.imagem.filename}`).then(res => res.blob()).catch(err => this.handleError(err))
            await fetch(`http://localhost:3000/recipes/clicked/${recipeid}`, {
                method: 'PATCH'
            }).catch(err => this.handleError(err))
            const modalTitle = document.querySelector('.modal-title')
            const modalBody = document.querySelector('.modal-body')
            modalBody.innerHTML = ''
            const img = document.createElement('img')
            img.src = URL.createObjectURL(data);
            img.classList.add("d-block", "w-100")
            modalBody.append(img)
            modalTitle.textContent = receita.nome
            const ul = document.createElement('ul')
            ul.classList.add('list-group', 'list-group-flush')
            for (const key of Object.keys(receita)) {
                const li = document.createElement('li')
                li.classList.add('list-group-item', 'mt-3')
                switch (key) {
                    case 'descricao':
                        li.innerHTML = `<i class="fa fa-align-left me-1" aria-hidden="true"></i> ${receita.descricao}`
                        ul.append(li)
                        break;
                    case 'tempo':
                        li.innerHTML = `<i class="fa fa-clock-o me-1" aria-hidden="true"></i>  ${receita.tempo} MIN`
                        ul.append(li)
                        break;
                    case 'valor':
                        li.innerHTML = `<i class="fa fa-money me-1" aria-hidden="true"></i> ${receita.valor}`
                        ul.append(li)
                        break;
                }
            }
            modalBody.append(ul)
        })
    }
    loadView() {
        this._receitasView = new ReceitasView(document.querySelector('#receitas-view'));
        this._receitasView.update(this.listReceitas());
    }
    clearFields() {
        this._inputNome.value = ''
        this._inputDescricao.value = ''
        this._inputTempo.value = null
        this._inputImagem.value = null
        this._inputValor.value = 'R$ 0,00'
    }
}