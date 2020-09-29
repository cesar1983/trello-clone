import React from 'react'

import * as S from './styles'

type CardProps = {
  //  text: string | undefined;
  text?: string
}

const Card = ({ text }: CardProps) => {
  return <S.CardContainer>{text}</S.CardContainer>
}

export default Card
