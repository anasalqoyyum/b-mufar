import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../navigation/Navigator'
import { Material1, Material2, Material3, Material4, Material5, Material6, MaterialType } from '../StudyScreens/MenuScreen/MaterialConstant'

type Props = NativeStackScreenProps<RootStackParamList, 'GameSelect'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgMain = require('../../../assets/background/bg-main.png')
const title = require('../../../assets/title/memoryTitle.png')

export const GameSelectScreen = (props: Props) => {
  const { materialId } = props.route.params

  const getCurrentMaterial = () => {
    switch (materialId) {
      case 1:
        return Material1
      case 2:
        return Material2
      case 3:
        return Material3
      case 4:
        return Material4
      case 5:
        return Material5
      case 6:
        return Material6
    }
  }

  const material = getCurrentMaterial()

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
            {Object.entries(material).map(([key, val]) => {
              return (
                <TButton
                  key={key}
                  size={'56'}
                  className="active:translate-y-1 active:opacity-90"
                  bgColor={'none'}
                  onPress={() => props.navigation.navigate('MemoryGame', { materialTheme: key as MaterialType })}>
                  <Image size={'56'} source={val} alt="home" />
                </TButton>
              )
            })}
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
