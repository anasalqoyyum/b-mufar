import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Center, Heading, Image, Text, View } from 'native-base'
import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { Winning } from '../../components/Winning/Winning'
import { LessonType } from '../../constants/Models/Lesson'
import { RootStackParamList } from '../../navigation/Navigator'
import { getCurrentBackground, getCurrentLesson, getCurrentMaterial, shuffleArray } from '../../utils/Commons'
import { calculateCurrentGameSize } from '../../utils/Game'
import { MaterialType } from '../StudyScreens/MenuScreen/MaterialConstant'
import { MatchUpBoard } from './components/Board'

type Props = NativeStackScreenProps<RootStackParamList, 'MatchGame'>

const TBox = styled(Box)
const TText = styled(Text)
const THeading = styled(Heading)

const timer = require('../../../assets/icon/timer.png')
// const title = require('../../../assets/title/memoryTitle.png')

export const MatchGameScreen = (props: Props) => {
  const [isWin, setIsWin] = useState(false)
  // const [time, setTime] = useState(0)
  const [point, setPoint] = useState(0)
  const { materialId } = props.route.params

  const GAME_SIZE = calculateCurrentGameSize('match', materialId)
  const TOTAL_ROUND = materialId <= 3 ? 1 : 2
  const ROUND_BOARD_SIZE = GAME_SIZE / TOTAL_ROUND

  const lessons = getCurrentMaterial(materialId)
  const [init, setInit] = useState(false)
  const [gameBoard, setGameBoard] = useState<Record<string, LessonType[]>>({
    question: [],
    answer: []
  })
  const [selectedMaterial, setSelectedMaterial] = useState<LessonType[]>([])
  const [section, setSection] = useState(1)

  const createGameBoard = () => {
    let board: LessonType[] = []

    if (!init) {
      let currentMaterial: LessonType[] = []

      for (const [key, _] of Object.entries(lessons)) {
        currentMaterial = [...currentMaterial, ...getCurrentLesson(key as MaterialType)]
      }

      let material = shuffleArray(currentMaterial).slice(0, GAME_SIZE)

      // Add more if it isn't enough
      if (material.length !== GAME_SIZE) {
        const minus = GAME_SIZE - material.length
        const more = shuffleArray(currentMaterial).slice(0, minus)
        material = [...material, ...more]
      }

      board = material.slice(0, ROUND_BOARD_SIZE)
      setSelectedMaterial(material)
      setInit(true)
    }

    if (section >= 2) {
      // slice for the next round
      board = shuffleArray(selectedMaterial.slice(ROUND_BOARD_SIZE * (section - 1), ROUND_BOARD_SIZE * section))
    }

    let question = [...board]
    let answer = [...board]

    question = shuffleArray(question)
    answer = shuffleArray(answer)

    setGameBoard({ question: question, answer: answer })
  }

  const getBg = () => {
    let materialTheme: MaterialType = 'profesi'
    for (const [key, _] of Object.entries(lessons)) {
      materialTheme = key as MaterialType
      break
    }
    return getCurrentBackground(materialTheme)
  }

  const goNextSection = () => {
    setSection(section + 1)
  }

  useEffect(() => {
    createGameBoard()
  }, [section])

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTime(time => time + 1)
  //   }, 1000)

  //   if (isWin) {
  //     clearInterval(timer)
  //     setTime(time)
  //   }

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [isWin])

  // const formatTime = `${`${Math.floor(time / 60)}`.padStart(2, '0')}:${`${time % 60}`.padStart(2, '0')}`
  const formatPoint = () => {
    if (materialId === 1 || materialId === 2 || materialId === 3) {
      if (point <= 2) {
        return 121
      } else if (point < 2 && point <= 4) {
        return 61
      } else if (point > 4) {
        return 1
      }
    } else if (materialId === 4 || materialId === 5 || materialId === 6) {
      if (point <= 3) {
        return 121
      } else if (point < 3 && point <= 7) {
        return 61
      } else if (point > 7) {
        return 1
      }
    }
  }

  return (
    <PageWrapper image={getBg()}>
      <TBox className="h-full w-full items-center justify-center">
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        {isWin && <Winning navigation={props.navigation} time={formatPoint()} score={point} isScore />}
        {/* <TBox className="absolute top-4 right-8 z-10"> */}
        {/* <Image zIndex={10} size={'16'} source={timer} alt="home" />
          <TBox className="absolute inset-0 z-10 items-center justify-center">
            <TText>{formatTime}</TText>
          </TBox> */}
        {/* </TBox> */}
        {/* <TBox>
          <TImage size={'sm'} source={title} width={200} height={50} alt="home" />
        </TBox> */}
        <View>
          <MatchUpBoard
            setIsWin={setIsWin}
            setPoint={setPoint}
            point={point}
            gameSize={GAME_SIZE}
            roundSize={ROUND_BOARD_SIZE}
            totalRound={TOTAL_ROUND}
            board={gameBoard}
            section={section}
            goNextSection={goNextSection}
          />
        </View>
      </TBox>
    </PageWrapper>
  )
}
