import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Center, Image, View } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../navigation/Navigator'
import KnightMoves from './components/Knight'

type Props = NativeStackScreenProps<RootStackParamList, 'MatchGame'>

const TBox = styled(Box)
const TButton = styled(Button)
const TCenter = styled(Center)
const TImage = styled(Image)

const bgMain = require('../../../assets/background/bg-main.png')
const title = require('../../../assets/title/memoryTitle.png')

export const MatchGameScreen = (props: Props) => {
  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center justify-center">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        {/* <TBox>
          <TImage size={'sm'} source={title} width={200} height={50} alt="home" />
        </TBox> */}
        <View>
          <KnightMoves />
        </View>
      </TBox>
    </PageWrapper>
  )
}
