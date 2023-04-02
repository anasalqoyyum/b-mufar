import { Box, Button, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'

type Props = {
  onPress: () => void
}

const TButton = styled(Button)
const TBox = styled(Box)

const backBtn = require('../../../assets/icon/arrow-left.png')

export const BackButton = (props: Props) => {
  return (
    <TBox className="absolute bottom-4 left-8 z-10">
      <TButton size={'16'} className="active:translate-y-1 active:opacity-90" bgColor={'none'} onPress={props.onPress}>
        <Image size={'16'} source={backBtn} alt="back" />
      </TButton>
    </TBox>
  )
}
