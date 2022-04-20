import styled from 'styled-components/native'

export const Container = styled.View`
  margin-bottom: 5px;
  padding: 10px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.4);
  background-color: rgba(0, 0, 0, 0.02);
`
export const Type = styled.View`
  flex-direction: row;
`
export const IconView = styled.View`
  flex-direction: row;
  background-color: ${props =>
    props.type === 'despesa' ? '#c62c36' : '#049301'};
  padding: 3px 8px;
  border-radius: 7px;
`
export const TypeText = styled.Text`
  font-size: 16px;
  font-weight: bold
  color: #fff;
`
export const ValueText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #222;
`
