import React, { useState, useEffect, useContext } from 'react'
import { Alert } from 'react-native'
import { Background, Container, Name, Balance, Title, List } from './styles'
import { Header } from '../../components/Header'
import { HistoricList } from '../../components/HistoricList'
import { AuthContext } from '../../contexts/auth'
import { format, isBefore } from 'date-fns'
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
              value: childItem.val().value,
              date: childItem.val().date
            }

            setHistoric(oldArray => [...oldArray, list])
          })
        })
    }

    loadList()
  }, [])

  function handleDelete(data) {
    const [dayItem, monthItem, yearItem] = data.date.split('/')
    const dateItem = new Date(`${yearItem}/${monthItem}/${dayItem}`)

    const formatTodayDate = format(new Date(), 'dd/MM/yyyy')
    const [dayToday, monthToday, yearToday] = formatTodayDate.split('/')
    const dateToday = new Date(`${yearToday}/${monthToday}/${dayToday}`)

    if (isBefore(dateItem, dateToday)) {
      alert('Você não pode excluir um registro antigo!')
      return
    }

    Alert.alert(
      'Atenção...',
      `Você deseja excluir ${data.type} - Valor: ${data.value}`,
      [
        { text: 'Cancelar', type: 'cancel' },
        { text: 'Continuar', onPress: () => handleDeleteSuccess(data) }
      ]
    )
  }

  async function handleDeleteSuccess(data) {
    await firebase
      .database()
      .ref('historic')
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let actualBalance = balance
        data.type === 'despesa'
          ? (actualBalance += parseFloat(data.value))
          : (actualBalance -= parseFloat(data.value))

        await firebase
          .database()
          .ref('users')
          .child(uid)
          .child('balance')
          .set(actualBalance)
      })
      .catch(err => {
        alert(err)
      })
  }

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
        renderItem={({ item }) => (
          <HistoricList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Background>
  )
}
