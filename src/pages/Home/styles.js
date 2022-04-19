import styled from 'styled-components/native'

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`

export const Container = styled.View`
  margin-left: 15px;
  margin-bottom: 25px;
`

export const Name = styled.Text`
  color: #fff;
  font-style: italic;
  font-size: 19px;
`

export const Balance = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 30px
  margin-top: 5px;
`

export const Title = styled.Text`
  color: #00b94a;
  margin-left: 15px;
  margin-bottom: 10px;
`

export const List = styled.FlatList.attrs({
  marginHorizontal: 15
})`
  padding-top: 15px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin: 0 8px;
  background-color: #fff;
`
