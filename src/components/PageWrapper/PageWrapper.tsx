import React, { ReactNode } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

type Props = {
  children: ReactNode
  image: ImageSourcePropType
}

export const PageWrapper = (props: Props) => {
  return (
    <GestureHandlerRootView>
      <ImageBackground source={props.image}>{props.children}</ImageBackground>
    </GestureHandlerRootView>
  )
}
