import React from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { Container, ButtonMenu } from './styles'

export function Header() {
  const navigation = useNavigation()

  return (
    <Container>
      <ButtonMenu
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Feather name="menu" size={30} color="#fff" />
      </ButtonMenu>
    </Container>
  )
}
