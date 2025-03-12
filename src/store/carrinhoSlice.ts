// redux toolkit
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Produto } from '../App'

type CartState = {
  itens: Produto[]
}
// início
const initialState: CartState = {
  itens: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const produtoExiste = state.itens.find((p) => p.id === produto.id)

      if (!produtoExiste) {
        state.itens.push(produto)
      } else {
        alert('Item já adicionado')
      }
      // alerta o cliente
    },
    removerDoCarrinho: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((p) => p.id !== action.payload)
    }
  }
})

export const { adicionarAoCarrinho, removerDoCarrinho } = carrinhoSlice.actions
export default carrinhoSlice.reducer
