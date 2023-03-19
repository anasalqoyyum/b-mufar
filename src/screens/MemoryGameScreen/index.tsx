import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Flex, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useState, useEffect } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { Arah } from '../../constants/lessons/1-Perkenalan/Arah'
import { Profesi } from '../../constants/lessons/1-Perkenalan/Profesi'
import { FasilitasSekolah } from '../../constants/lessons/2-Fasilitas/FasilitasSekolah'
import { RuangSekolah } from '../../constants/lessons/2-Fasilitas/RuangSekolah'
import { PeralatanSekolah } from '../../constants/lessons/3-PeralatanSekolah/PeralatanSekolah'
import { PerangkatKelas } from '../../constants/lessons/3-PeralatanSekolah/PerangkatKelas'
import { Warna } from '../../constants/lessons/3-PeralatanSekolah/Warna'
import { Alamat } from '../../constants/lessons/4-Alamat/Alamat'
import { Angka } from '../../constants/lessons/4-Alamat/Angka'
import { IsiRuangan } from '../../constants/lessons/5-Rumah/IsiRuangan'
import { RuanganRumah } from '../../constants/lessons/5-Rumah/RuanganRumah'
import { AnggotaKeluarga } from '../../constants/lessons/6-Keluarga/Anggota'
import { KegiatanHarian } from '../../constants/lessons/6-Keluarga/KegiatanHarian'
import { RootStackParamList } from '../../navigation/Navigator'
import { MemoryCard } from './components/Card'

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>

const TBox = styled(Box)
const TImage = styled(Image)

const bgProfesi = require('../../../assets/background/bg-profesi.png')

const title11 = require('../../../assets/title/1-1.png')
const title12 = require('../../../assets/title/1-2.png')
const title21 = require('../../../assets/title/2-1.png')
const title22 = require('../../../assets/title/2-2.png')
const title31 = require('../../../assets/title/3-1.png')
const title32 = require('../../../assets/title/3-2.png')
const title33 = require('../../../assets/title/3-3.png')
const title41 = require('../../../assets/title/4-1.png')
const title42 = require('../../../assets/title/4-2.png')
const title51 = require('../../../assets/title/5-1.png')
const title52 = require('../../../assets/title/5-2.png')
const title61 = require('../../../assets/title/6-1.png')
const title62 = require('../../../assets/title/6-2.png')

export const MemoryGameScreen = (props: Props) => {
  const { materialTheme } = props.route.params
  const [board, setBoard] = useState([])
  const [chosenCard, setChosenCard] = useState<string[]>([])
  const [correctCard, setCorrectCard] = useState<string[]>([])
  const [point, setPoint] = useState(0)
  const [_isWin, setIsWin] = useState(false)
  // console.info('correctCard', correctCard)
  // console.info('chosenCard', chosenCard)
  // console.info(point)

  const getCurrentLesson = () => {
    const { materialTheme } = props.route.params

    switch (materialTheme) {
      case 'profesi':
        return Profesi
      case 'arah':
        return Arah
      case 'fasilitasSekolah':
        return FasilitasSekolah
      case 'ruangSekolah':
        return RuangSekolah
      case 'peralatanSekolah':
        return PeralatanSekolah
      case 'perangkatKelas':
        return PerangkatKelas
      case 'warna':
        return Warna
      case 'kosakataAlamat':
        return Alamat
      case 'angka':
        return Angka
      case 'ruangRumah':
        return RuanganRumah
      case 'isiRuang':
        return IsiRuangan
      case 'kegiatanHarian':
        return KegiatanHarian
      case 'anggotaKeluarga':
        return AnggotaKeluarga
    }
  }

  const getCurrentTitle = () => {
    const { materialTheme } = props.route.params

    switch (materialTheme) {
      case 'profesi':
        return title11
      case 'arah':
        return title12
      case 'fasilitasSekolah':
        return title22
      case 'ruangSekolah':
        return title21
      case 'peralatanSekolah':
        return title31
      case 'perangkatKelas':
        return title32
      case 'warna':
        return title33
      case 'kosakataAlamat':
        return title41
      case 'angka':
        return title42
      case 'ruangRumah':
        return title51
      case 'isiRuang':
        return title52
      case 'kegiatanHarian':
        return title61
      case 'anggotaKeluarga':
        return title62
    }
  }

  const createGameBoard = () => {
    const preProcessArr = shuffleArray(getCurrentLesson()).slice(0, 3)
    const newArr = [...preProcessArr, ...preProcessArr]

    setBoard(shuffleArray(newArr))
  }

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const checkChosenCard = () => {
    if (chosenCard.length < 2) return
    if (chosenCard.length === 2) {
      if (chosenCard[0] === chosenCard[1]) {
        const newVal = correctCard.concat(chosenCard[0])
        // console.log('correct')
        setChosenCard([])
        setCorrectCard(newVal)
        setPoint(point + 1)
      } else {
        // console.log('incorrect')
        setChosenCard([])
      }
    }
  }

  const setOpenedCard = (val: string) => {
    if (chosenCard.length <= 2) {
      const newVal = chosenCard.concat(val)
      setChosenCard(newVal)
    } else {
      setChosenCard([])
    }
  }

  const checkWinning = () => {
    if (point === 3) {
      // console.log('winning')
      setIsWin(true)
    }
  }

  function isCardChosen(image: any, _index: any) {
    return correctCard?.includes(image.id)
  }

  useEffect(() => {
    createGameBoard()
  }, [])

  useEffect(() => {
    checkChosenCard()
  }, [chosenCard])

  useEffect(() => {
    checkWinning()
  }, [point])

  return (
    <PageWrapper image={bgProfesi}>
      <TBox className="h-full w-full items-center pt-20">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        <TBox className="absolute right-8 top-4">
          <TImage size={'sm'} source={getCurrentTitle()} width={200} height={50} alt="home" />
        </TBox>
        <TBox>
          <Flex width={'1/2'} height={'40'} flexDirection={'row'} flexWrap={'wrap'}>
            {board.slice(0, 6).map((val, idx) => {
              return (
                <MemoryCard
                  key={idx}
                  material={val}
                  correctCard={correctCard}
                  chosenCard={chosenCard}
                  setChosenCard={setOpenedCard}
                  isChosen={isCardChosen(val, idx)}
                  isDisabled={chosenCard.length >= 2}
                />
              )
            })}
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
