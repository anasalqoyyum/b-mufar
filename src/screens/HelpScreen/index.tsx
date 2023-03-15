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

const bgMain = require('../../../assets/background/bg-main.png')
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
        <TImage className="absolute bottom-36 scale-[.2]" source={title} alt="home" />
        <TBox className="absolute">
          <TImage className="scale-[.80]" source={scrollHelp} alt="scroll" />
        </TBox>
        <TText className="mt-28 h-16" bold size={'md'}>
          Media pembelajaran ini materi kosakata bahasa Arab beserta game terkait materi. Pengguna dapat meng-klik tombol atau gambar yang
          tersedia di halaman aplikasi. Perhatikan fungsi tombol berikut:
        </TText>
        <TText className="h-12 pt-4" bold size={'md'}>
          <TImage size={'10'} source={homeBtn} alt="homehelp" /> Menuju ke halaman menu utama
        </TText>
        <TText className="h-12 pt-4" bold size={'md'}>
          <TImage size={'10'} source={arrowRight} alt="arrowRight" /> Menuju ke tampilan selanjutnya
        </TText>
        <TText className="h-12 pt-4" bold size={'md'}>
          <TImage size={'10'} source={arrowLeft} alt="arrowLeft" /> Menuju ke tampilan sebelumnya
        </TText>
        <TText className="h-12 pt-4" bold size={'md'}>
          <TImage size={'10'} source={music} alt="music" /> <TImage size={'10'} source={musicOn} alt="music" /> Mematikan/menghidupkan musik
          pengiring
        </TText>
      </TBox>
    </PageWrapper>
  )
}
