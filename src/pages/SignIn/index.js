import React, { useState } from 'react'
import { Keyboard } from 'react-native'
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
import firebase from '../../services/firebaseConnection'

export function SignIn() {
  const [type, setType] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSignUpOrLogin() {
    if (type === 'login') {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(value => {
          alert(`Logado com sucesso! 🔥 ${value.user.email}`)
        })
        .catch(err => {
          alert(`Ops... parece que algo estranho aconteceu! 😥 ${err}`)
          return
        })
      setEmail('')
      setPassword('')
      Keyboard.dismiss()
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
          alert(`Usuário criado com sucesso! 😀 ${value.user.email}`)
        })
        .catch(err => {
          alert(`Ops... parece que aconteceu algo inesperado! 😭 ${err}`)
          return
        })
      setEmail('')
      setPassword('')
      Keyboard.dismiss()
    }
  }

  return (
    <Background>
      <Container>
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

        <SubmitButton onPress={() => handleSignUpOrLogin()} type={type}>
          <SubmitText>{type === 'login' ? 'LOGIN' : 'CADASTRAR'}</SubmitText>
        </SubmitButton>

        <Link onPress={() => setType(type === 'login' ? 'signUp' : 'login')}>
          <LinkText>
            {type === 'login'
              ? 'Criar uma conta'
              : 'Já possui uma conta? Faça Login'}
          </LinkText>
        </Link>
      </Container>
    </Background>
  )
}
