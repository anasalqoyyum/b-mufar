import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Image } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../../components/HomeButton/BackButton'
import { HomeButton } from '../../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../../navigation/Navigator'
import { getCurrentMaterial } from '../../../utils/Commons'
import { MaterialType } from './MaterialConstant'

type Props = NativeStackScreenProps<RootStackParamList, 'MaterialSelect'>

const TBox = styled(Box)
const TButton = styled(Button)
const TImage = styled(Image)

const bgMain = require('../../../../assets/background/bg-materi.png')
const title = require('../../../../assets/title/materi-title.png')

export const MaterialSelectScreen = (props: Props) => {
  const { materialId } = props.route.params

  const material = getCurrentMaterial(materialId)

  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center justify-center">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.navigate('StudyMenu')} />
        <TBox>
          <TImage size={'sm'} source={title} width={['300', '350', '400']} height={50} alt="home" />
        </TBox>
        <TBox className="mt-8 scale-[.8]">
          <Flex flexDirection={'row'}>
            {Object.entries(material).map(([key, val]) => {
              return (
                <TButton
                  key={key}
                  size={['48', '48', '56']}
                  className="active:translate-y-1 active:opacity-90"
                  bgColor={'none'}
                  onPress={() => props.navigation.navigate('StudyCardScreen', { materialTheme: key as MaterialType })}>
                  <Image size={['48', '48', '56']} source={val} alt="home" />
                </TButton>
              )
            })}
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
