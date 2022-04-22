import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { Container, Type, IconView, TypeText, ValueText } from './styles'
import { Feather } from '@expo/vector-icons'

export function HistoricList({ data, deleteItem }) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Type>
          <IconView type={data.type}>
            <Feather
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              size={20}
              color="#fff"
            />
            <TypeText>{data.type}</TypeText>
          </IconView>
        </Type>
        <ValueText>{`R$${data.value}`}</ValueText>
      </Container>
    </TouchableWithoutFeedback>
  )
}
