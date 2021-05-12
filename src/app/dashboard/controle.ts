export class Controle {
    id: number
    valor: number
    tipo: string
    detalhes: string
    data_valor: string

    constructor(id?: number, valor?: number, tipo?: string, descricao?: string, data_valor?: string) {
        this.id = id
        this.valor = valor
        this.tipo = tipo
        this.detalhes = descricao
        this.data_valor = data_valor
    }
}