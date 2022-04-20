import React from 'react'
import { PickerView } from './styles'
import { Picker } from '@react-native-picker/picker'

export function PickerComponent({ onChange, type }) {
  return (
    <PickerView>
      <Picker
        selectedValue={type}
        onValueChange={value => onChange(value)}
        style={{
          width: '98%'
        }}
      >
        <Picker.Item label="Receita" value="receita" />
        <Picker.Item label="Despesa" value="despesa" />
      </Picker>
    </PickerView>
  )
}
