import React, { useState, useContext } from 'react'
import { Background, Container, Name, Balance, Title, List } from './styles'
import { Header } from '../../components/Header'
import { HistoricList } from '../../components/HistoricList'
import { AuthContext } from '../../contexts/auth'

export function Home() {
  const { user } = useContext(AuthContext)
  const [historic, setHistoric] = useState([
    { key: '1', type: 'Receita', value: 1200.03 },
    { key: '2', type: 'Despesa', value: 682.35 },
    { key: '3', type: 'Despesa', value: 200.02 },
    { key: '4', type: 'Receita', value: 1000.0 },
    { key: '5', type: 'Receita', value: 342.85 },
    { key: '6', type: 'Despesa', value: 744.1 },
    { key: '7', type: 'Receita', value: 100.5 },
    { key: '8', type: 'Receita', value: 310.1 },
    { key: '9', type: 'Despesa', value: 332.58 }
  ])

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name}</Name>
        <Balance>R$1.290,31</Balance>
      </Container>

      <Title>Últimas movimentações</Title>
      <List
        data={historic}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <HistoricList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Background>
  )
}
