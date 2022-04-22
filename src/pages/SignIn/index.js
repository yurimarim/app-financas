import React, { useState, useContext } from 'react'
import { Keyboard, Platform, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../contexts/auth'
import {
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText
} from './styles'

export function SignIn() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleLogin() {
    signIn(email, password)
    Keyboard.dismiss()
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <Logo source={require('../../assets/Logo.png')} />
        <AreaInput>
          <Input
            value={email}
            onChangeText={text => setEmail(text)}
            placeholder="E-mail"
            autoCapitalize="none"
          />
        </AreaInput>
        <AreaInput>
          <Input
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
          />
        </AreaInput>

        <SubmitButton onPress={() => handleLogin()} type="login">
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>LOGIN</SubmitText>
          )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkText>
            Não possui conta? Clique aqui para criar uma conta!
          </LinkText>
        </Link>
      </Container>
    </Background>
  )
}
