import { Box } from 'native-base'
import { styled } from 'nativewind'
import React, { ReactNode } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'

type Props = {
  children: ReactNode
  image: ImageSourcePropType
}

const TBox = styled(Box)

export const PageWrapper = (props: Props) => {
  return (
    <TBox>
      <ImageBackground source={props.image}>{props.children}</ImageBackground>
    </TBox>
  )
}
