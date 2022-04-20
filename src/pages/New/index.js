import React, { useState, useContext } from 'react'
import {
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'
import { Header } from '../../components/Header'
import { PickerComponent } from '../../components/Picker'
import { Background, Input, SubmitButton, SubmitText } from './styles'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import firebase from '../../services/firebaseConnection'

export function New() {
  const navigation = useNavigation()
  const [value, setValue] = useState('')
  const [type, setType] = useState(null)
  const { user: userLoggedIn } = useContext(AuthContext)

  function handleSubmit() {
    Keyboard.dismiss()

    if (isNaN(parseFloat(value)) || type === null) {
      alert('Preencha todos os campos!')
      return
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo: ${type} - Valor: ${parseFloat(value)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd() {
    let uid = userLoggedIn.uid
    let key = await firebase.database().ref('historic').child(uid).push().key
    await firebase
      .database()
      .ref('historic')
      .child(uid)
      .child(key)
      .set({
        type: type,
        value: parseFloat(value),
        date: format(new Date(), 'dd/MM/yyyy')
      })

    //
    let user = firebase.database().ref('users').child(uid)
    await user.once('value').then(snapshot => {
      let balance = parseFloat(snapshot.val().balance)

      type === 'despesa'
        ? (balance -= parseFloat(value))
        : (balance += parseFloat(value))

      user.child('balance').set(balance)
    })

    Keyboard.dismiss()
    setValue('')
    navigation.navigate('Home')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            value={value}
            onChangeText={text => setValue(text)}
            placeholder="Valor"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <PickerComponent onChange={setType} type={type} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  )
}
