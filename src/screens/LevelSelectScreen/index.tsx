import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'LevelSelect'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgMain = require('../../../assets/background/bg-random.png')
const title = require('../../../assets/title/levels.png')

const buttonMap = {
  '1Main': require('../../../assets/icon/lvl1.png'),
  '2Main': require('../../../assets/icon/lvl2.png'),
  '3Main': require('../../../assets/icon/lvl3.png'),
  '4Main': require('../../../assets/icon/lvl4.png'),
  '5Main': require('../../../assets/icon/lvl5.png'),
  '6Main': require('../../../assets/icon/lvl6.png')
}

export const LevelSelectScreen = (props: Props) => {
  const { gameType } = props.route.params
  const navigateTo = gameType === 'memory' ? 'MemoryGame' : 'MatchGame'

  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center justify-center">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        <TBox>
          <TImage size={'sm'} source={title} width={200} height={50} alt="home" />
        </TBox>
        <TBox className="scale-[.9]">
          <Flex flexDirection={'row'}>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate(navigateTo, { materialId: 1 })}>
              <Image size={'40'} source={buttonMap['1Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate(navigateTo, { materialId: 2 })}>
              <Image size={'40'} source={buttonMap['2Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate(navigateTo, { materialId: 3 })}>
              <Image size={'40'} source={buttonMap['3Main']} alt="image" />
            </TButton>
          </Flex>
          <Flex flexDirection={'row'}>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate(navigateTo, { materialId: 4 })}>
              <Image size={'40'} source={buttonMap['4Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate(navigateTo, { materialId: 5 })}>
              <Image size={'40'} source={buttonMap['5Main']} alt="image" />
            </TButton>
            <TButton
              size={'40'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate(navigateTo, { materialId: 6 })}>
              <Image size={'40'} source={buttonMap['6Main']} alt="image" />
            </TButton>
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
