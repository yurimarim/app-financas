import React, { useContext } from 'react'
import { Container, Name, NewLink, NewText, Logout, LogoutText } from './styles'
import { AuthContext } from '../../contexts/auth'
import { useNavigation } from '@react-navigation/native'

export function Profile() {
  const navigation = useNavigation()
  const { user, signOut } = useContext(AuthContext)

  return (
    <Container>
      <Name>{user && user.name}</Name>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar Gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  )
}
