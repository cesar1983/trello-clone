import React from 'react'

import * as S from './styles'

type CardProps = {
  //  text: string | undefined;
  text?: string
}

export const Card = ({ text }: CardProps) => {
  return <S.CardContainer>{text}</S.CardContainer>
}
