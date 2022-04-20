import React, { useState, useEffect, useContext } from 'react'
import { Background, Container, Name, Balance, Title, List } from './styles'
import { Header } from '../../components/Header'
import { HistoricList } from '../../components/HistoricList'
import { AuthContext } from '../../contexts/auth'
import { format } from 'date-fns'
import firebase from '../../services/firebaseConnection'

export function Home() {
  const [historic, setHistoric] = useState([])
  const [balance, setBalance] = useState(0)
  const { user } = useContext(AuthContext)
  const uid = user && user.uid

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref('users')
        .child(uid)
        .on('value', snapshot => {
          setBalance(snapshot.val().balance)
        })

      await firebase
        .database()
        .ref('historic')
        .child(uid)
        .orderByChild('date')
        .equalTo(format(new Date(), 'dd/MM/yyyy'))
        .limitToLast(10)
        .on('value', snapshot => {
          setHistoric([])
          snapshot.forEach(childItem => {
            let list = {
              key: childItem.key,
              type: childItem.val().type,
              value: childItem.val().value
            }

            setHistoric(oldArray => [...oldArray, list])
          })
        })
    }

    loadList()
  }, [])

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.name}</Name>
        <Balance>
          R${balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}
        </Balance>
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
