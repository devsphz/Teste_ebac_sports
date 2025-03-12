// acessar o estado global :)
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from './store/store'
import { adicionarAoCarrinho } from './store/carrinhoSlice'
// produtos da api
import { useGetProdutosQuery } from './store/apiSlice'

import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { useState } from 'react'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

// buscar os produtos
function App() {
  const { data: produtos = [], isLoading, isError } = useGetProdutosQuery()

  const [favoritos, setFavoritos] = useState<Produto[]>([])

  const carrinho = useSelector((state: RootState) => state.carrinho.itens)
  const dispatch = useDispatch()

  function adicionarProdutoNoCarrinho(produto: Produto) {
    dispatch(adicionarAoCarrinho(produto))
  }
  // fim

  // adicionar e remover o produto da Ebac Sports
  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  if (isLoading) return <p>Carregando produtos...</p>
  if (isError) return <p>Erro ao carregar os produtos.</p>
  // fim
  // renderização
  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarProdutoNoCarrinho}
        />
      </div>
    </>
  )
}
// fim
export default App
