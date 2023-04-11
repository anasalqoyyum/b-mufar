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
const settingBtn = require('../../../assets/icon/help-btn_text.png')

export const GameSelectScreen = (props: Props) => {
  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center justify-center">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <TBox className="absolute bottom-4 left-8">
          <TButton
            size={['12', '12', '16']}
            width={['24', '24', '32']}
            className="active:translate-y-1 active:opacity-90"
            bgColor={'none'}
            onPress={() => props.navigation.navigate('GameHelp')}>
            <TImage size={['12', '12', '16']} width={['24', '24', '32']} source={settingBtn} alt="help" />
          </TButton>
        </TBox>
        <TBox>
          <TImage size={'sm'} source={title} width={['300', '350', '400']} height={50} alt="home" />
        </TBox>
        <TBox className="mt-8 scale-[.85]">
          <Flex width={'4/5'} flexDirection={'row'}>
            <TButton
              size={['40', '40', '56']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('LevelSelect', { gameType: 'memory' })}>
              <Image size={['40', '40', '56']} source={iconMemory} alt="home" />
            </TButton>
            <TButton
              size={['40', '40', '56']}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => props.navigation.navigate('LevelSelect', { gameType: 'match' })}>
              <Image size={['40', '40', '56']} source={iconMatchup} alt="home" />
            </TButton>
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
