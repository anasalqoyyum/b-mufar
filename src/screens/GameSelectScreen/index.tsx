import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'GameSelect'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgMain = require('../../../assets/background/bg-game.png')
const iconMemory = require('../../../assets/icon/memory.png')
const iconMatchup = require('../../../assets/icon/matchup.png')
const title = require('../../../assets/title/lvltitle.png')

export const GameSelectScreen = (props: Props) => {
  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center justify-center">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.navigate('Main')} />
        <TBox>
          <TImage size={'sm'} source={title} width={200} height={50} alt="home" />
        </TBox>
        <TBox className="scale-[.9]">
          <Flex width={'4/5'} flexDirection={'row'}>
            <TButton
              size={'56'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('LevelSelect', { gameType: 'memory' })}>
              <Image size={'56'} source={iconMemory} alt="home" />
            </TButton>
            <TButton
              size={'56'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('LevelSelect', { gameType: 'match' })}>
              <Image size={'56'} source={iconMatchup} alt="home" />
            </TButton>
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
