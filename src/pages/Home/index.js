import React, { useContext } from 'react'
import { Background, Container, Name, Balance, Title } from './styles'
import { Header } from '../../components/Header'
import { AuthContext } from '../../contexts/auth'

export function Home() {
  const { user } = useContext(AuthContext)

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$1.290,31</Balance>
      </Container>

      <Title>Últimas movimentações</Title>
    </Background>
  )
}
