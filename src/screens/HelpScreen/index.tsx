import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Image, Text } from 'native-base'
import { styled } from 'nativewind'
import React from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { RootStackParamList } from '../../navigation/Navigator'

type Props = NativeStackScreenProps<RootStackParamList, 'Help'>

const TText = styled(Text)
const TImage = styled(Image)
const TBox = styled(Box)

const bgMain = require('../../../assets/background/bg-materi2.png')
const scrollHelp = require('../../../assets/icon/scroll-help.png')
const title = require('../../../assets/title/petunjuk-title.png')

const homeBtn = require('../../../assets/icon/home-btn.png')
const arrowRight = require('../../../assets/icon/arrow-right.png')
const arrowLeft = require('../../../assets/icon/arrow-left.png')
const music = require('../../../assets/icon/music-off.png')
const musicOn = require('../../../assets/icon/music-on.png')

export const HelpScreen = (props: Props) => {
  return (
    <PageWrapper image={bgMain}>
      <TBox className="h-full w-full items-center pt-5">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.navigate('Main')} />
        <TBox>
          <TImage size={'sm'} source={title} width={400} height={60} alt="home" />
        </TBox>
        <TBox className="absolute">
          <TImage className="scale-[.90]" source={scrollHelp} alt="scroll" />
        </TBox>
        <TBox className="w-1/2 items-center">
          <TText className="mt-14 h-16" bold size={'md'}>
            Media pembelajaran ini berisi materi kosakata bahasa Arab beserta game terkait materi. Pengguna dapat meng-klik tombol atau
            gambar yang tersedia di halaman aplikasi. Perhatikan fungsi tombol berikut:
          </TText>
          <TText className="h-11 pt-1" bold size={'md'}>
            <TImage size={'8'} source={homeBtn} alt="homehelp" /> Menuju ke halaman menu utama
          </TText>
          <TText className="h-11 pt-1" bold size={'md'}>
            <TImage size={'8'} source={arrowRight} alt="arrowRight" /> Menuju ke tampilan selanjutnya
          </TText>
          <TText className="h-11 pt-1" bold size={'md'}>
            <TImage size={'8'} source={arrowLeft} alt="arrowLeft" /> Menuju ke tampilan sebelumnya
          </TText>
          <TText className="h-11 pt-1" bold size={'md'}>
            <TImage size={'8'} source={music} alt="music" /> <TImage size={'8'} source={musicOn} alt="music" /> Mematikan/menghidupkan musik
            pengiring
          </TText>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
