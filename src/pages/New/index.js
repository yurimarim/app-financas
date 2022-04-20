import React, { useState } from 'react'
import { SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Header } from '../../components/Header'
import { PickerComponent } from '../../components/Picker'
import { Background, Input, SubmitButton, SubmitText } from './styles'

export function New() {
  const [value, setValue] = useState('')
  const [type, setType] = useState('receita')

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

          <SubmitButton>
            <SubmitText>Teste</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  )
}
