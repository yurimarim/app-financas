import styled from 'styled-components/native'

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`
export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(0, 0, 0, 0.4)'
})`
  width: 90%;
  height: 50px;
  font-size: 17px;
  margin-top: 30px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.9);
`

export const SubmitButton = styled.TouchableOpacity`
  width: 90%
  height: 50px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #00b94a;
`

export const SubmitText = styled.Text`
  text-align: center;
  font-size: 21px;
  font-weight: bold;
  color: #fff;
`
