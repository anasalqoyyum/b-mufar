import { View } from 'native-base'
import React, { ReactNode } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'

type Props = {
  children: ReactNode
  image: ImageSourcePropType
}

export const PageWrapper = (props: Props) => {
  return (
    <View>
      <ImageBackground source={props.image}>{props.children}</ImageBackground>
    </View>
  )
}
