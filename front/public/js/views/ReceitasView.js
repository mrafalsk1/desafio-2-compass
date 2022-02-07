class ReceitasView extends View {
    constructor(elemento) {
        super(elemento)
    }
    template(data) {
        var html = ''
        if (data.length)
            for (var recipe of data) {
                var receitaHtml = `
            <div  id="${recipe.receita._id}" class="card" style="width: 18rem;max-heigth:5rem;cursor: 'pointer'" data-bs-toggle="modal" data-bs-target="#modal" data-bs-recipeId="${recipe.receita._id}">
                <img src="${recipe.urlImage}" class="card-img-top" alt="${recipe.receita.nome}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.receita.nome}</h5>

                </div>
            </div>
            `
                html += receitaHtml
            }
        if (data.length) return html
        else return `
        <h3 class="mt-3">Nenhuma receita cadastrada</h3>
        `
    }
}