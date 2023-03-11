import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Image, Text, Box, Stack, Button, Flex, IconButton, Icon } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { ImageBackground } from 'react-native'
import { RootStackParamList } from '../../navigation/Navigator'
import { MaterialIcons } from '@expo/vector-icons'
import { MusicButton } from '../../components/MusicButton/MusicButton'

type Props = NativeStackScreenProps<RootStackParamList, 'Main'>

const TStack = styled(Stack)
const TFlex = styled(Flex)
const TText = styled(Text)
const TImage = styled(Image)
const TButton = styled(Button)
const TIconButton = styled(IconButton)
const TBox = styled(Box)

export const MainScreen = ({ navigation }: Props) => {
  const bgMain = require('../../../assets/background/bg-main.png')
  const textLogo = require('../../../assets/background/text-logo.png')
  const btMainMenu = require('../../../assets/icon/ButtonMainMenu.png')

  return (
    <TBox>
      <ImageBackground source={bgMain}>
        <TBox className="h-3/4 w-full pt-28 items-center">
          <TBox className="items-center justify-center">
            <TImage className="-rotate-6 w-80 h-auto mb-4" source={textLogo} alt="logo" />
            <TText className="text-base font-semibold text-yellow-600">Belajar Mufradat Bahasa Arab</TText>
          </TBox>
          <TStack className="mt-8" direction={{ base: 'row' }} space={4}>
            <TBox>
              <TIconButton
                className="mr-8 mb-2 active:translate-y-1 transition-all duration-150"
                colorScheme={'amber'}
                borderRadius="full"
                size="16"
                variant={'solid'}
                icon={<Icon as={MaterialIcons} name="menu-book" size={'12'} />}
                onPress={() => navigation.navigate('Help')}
              />
            </TBox>
            <TBox>
              <TIconButton
                className="mr-8 mb-2 active:translate-y-1 transition-all duration-150"
                colorScheme={'amber'}
                borderRadius="full"
                size="16"
                variant={'solid'}
                icon={<Icon as={MaterialIcons} name="play-circle-fill" size={'12'} />}
                onPress={() => navigation.navigate('Help')}
              />
            </TBox>
            <TBox>
              <TButton className="active:translate-y-1" bgColor={'none'}>
                <Image size={'16'} source={btMainMenu} alt="main menu"></Image>
              </TButton>
            </TBox>
          </TStack>
        </TBox>
        <TFlex className="h-1/4 w-full" justifyContent={'space-between'}>
          <TStack className="mt-8 mx-8" direction={{ base: 'row' }} space={4} justifyContent="space-between">
            <TIconButton
              className="mr-8 active:translate-y-1 transition-all duration-150"
              colorScheme={'amber'}
              size="lg"
              variant={'solid'}
              icon={<Icon as={MaterialIcons} name="settings" />}
              onPress={() => navigation.navigate('Help')}
            />
            <MusicButton />
          </TStack>
        </TFlex>
      </ImageBackground>
    </TBox>
  )
}
