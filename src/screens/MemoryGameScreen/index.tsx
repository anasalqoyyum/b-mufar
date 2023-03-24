import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Flex, Heading } from 'native-base'
import { styled } from 'nativewind'
import React, { useState, useEffect } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { Winning } from '../../components/Winning/Winning'
import { LessonType } from '../../constants/Models/Lesson'
import { RootStackParamList } from '../../navigation/Navigator'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { initialMemoryGame, setMemoryGameState } from '../../store/slice'
import { getCurrentBackground, getCurrentLesson, getCurrentMaterial } from '../../utils/Commons'
import { calculateCurrentGameSize } from '../../utils/Game'
import { MaterialType } from '../StudyScreens/MenuScreen/MaterialConstant'
import { MemoryCard } from './components/Card'

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>

const TBox = styled(Box)
const THeading = styled(Heading)

export const MemoryGameScreen = (props: Props) => {
  const { materialId } = props.route.params

  const GAME_SIZE = calculateCurrentGameSize('memory', materialId)
  const TOTAL_ROUND = 2
  const ROUND_BOARD_SIZE = GAME_SIZE / TOTAL_ROUND

  const lessons = getCurrentMaterial(materialId)
  const gameState = useAppSelector(state => state.reducer.memoryGameState)
  const dispatch = useAppDispatch()

  const [init, setInit] = useState(false)
  const [board, setBoard] = useState<LessonType[]>([])
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
      const arr = shuffleArray(material.slice(0, ROUND_BOARD_SIZE))

      board = [...arr, ...arr]
      setSelectedMaterial(material)
      setInit(true)
    }

    if (section === 1) {
      dispatch(setMemoryGameState(initialMemoryGame))
    } else if (section >= 2) {
      const nextInitialMemoryGame = {
        ...initialMemoryGame,
        point: gameState.point
      }
      // slice for the next round
      const preProcessArr = shuffleArray(selectedMaterial.slice(ROUND_BOARD_SIZE * (section - 1), ROUND_BOARD_SIZE * section))

      board = [...preProcessArr, ...preProcessArr]
      dispatch(setMemoryGameState(nextInitialMemoryGame))
    }

    setBoard(shuffleArray(board))
  }

  const shuffleArray = (array: LessonType[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }

    return array
  }

  const setOpenedCard = (val: string) => {
    const { chosenCard } = gameState

    if (chosenCard.length === 0) {
      const newVal = chosenCard.concat(val)
      const newGameState = {
        ...gameState,
        chosenCard: newVal
      }

      dispatch(setMemoryGameState(newGameState))
    } else if (chosenCard.length === 1) {
      const { chosenCard, correctCard, point } = gameState
      const newChosenCard = chosenCard.concat(val)

      if (newChosenCard[0] === newChosenCard[1]) {
        const newCorrectCard = correctCard.concat(newChosenCard[0])
        const newGameState = {
          ...gameState,
          chosenCard: newChosenCard,
          correctCard: newCorrectCard,
          point: point + 1
        }

        dispatch(setMemoryGameState(newGameState))
      } else {
        const newGameState = {
          ...gameState,
          chosenCard: newChosenCard
        }

        dispatch(setMemoryGameState(newGameState))
      }
    }
  }

  const checkSectionDone = gameState.point !== 0 && gameState.point % ROUND_BOARD_SIZE === 0 && gameState.point <= GAME_SIZE

  const goNextSection = () => {
    if (checkSectionDone && section !== TOTAL_ROUND) {
      setSection(section + 1)
    }
  }

  const getBg = () => {
    let materialTheme: MaterialType = 'profesi'
    for (const [key, _] of Object.entries(lessons)) {
      materialTheme = key as MaterialType
      break
    }
    return getCurrentBackground(materialTheme)
  }

  useEffect(() => {
    createGameBoard()
  }, [section])

  useEffect(() => {
    setTimeout(goNextSection, 1000)
  }, [gameState.point])

  return (
    <PageWrapper image={getBg()}>
      <TBox className="h-full w-full items-center pt-5">
        <THeading size={'md'} className="mb-4 rounded-md border border-[#f6a21d] bg-[#fcbf85] py-1 px-4 text-gray-100">
          Ronde {section}
        </THeading>
        {gameState.point === GAME_SIZE && <Winning navigation={props.navigation} />}
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        {/* TODO: FIX THIS LATER */}
        {/* <TBox className="absolute right-8 top-4">
          <TImage size={'sm'} source={getCurrentTitle(materialTheme)} width={200} height={50} alt="home" />
        </TBox> */}
        {/* {!checkSectionDone && (
          <TBox className="absolute right-8 top-52">
            <TButton
              size={'10'}
              className="active:translate-y-1 active:opacity-90"
              bgColor={'none'}
              onPress={() => setSection(section + 1)}>
              <Image size={'10'} source={nextBtn} alt="next" />
            </TButton>
          </TBox>
        )} */}
        <TBox>
          <Flex height={['30%', '45%']} flexDirection={'row'}>
            {board.slice(0, 5).map((val, idx) => {
              return <MemoryCard key={idx + val.id} material={val} setOpenedCard={setOpenedCard} />
            })}
          </Flex>
          <Flex height={['30%', '45%']} flexDirection={'row'}>
            {board.slice(5, 10).map((val, idx) => {
              return <MemoryCard key={idx + val.id} material={val} setOpenedCard={setOpenedCard} />
            })}
          </Flex>
        </TBox>
      </TBox>
    </PageWrapper>
  )
}
