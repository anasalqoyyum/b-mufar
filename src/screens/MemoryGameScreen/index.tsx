import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Button, Flex, Heading, Image } from 'native-base'
import { styled } from 'nativewind'
import React, { useState, useEffect } from 'react'
import { BackButton } from '../../components/HomeButton/BackButton'
import { HomeButton } from '../../components/HomeButton/HomeButton'
import { PageWrapper } from '../../components/PageWrapper/PageWrapper'
import { LessonType } from '../../constants/Models/Lesson'
import { RootStackParamList } from '../../navigation/Navigator'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { initialMemoryGame, setMemoryGameState } from '../../store/slice'
import { getCurrentLesson, getCurrentTitle } from '../../utils/Commons'
import { MemoryCard } from './components/Card'

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryGame'>

const TBox = styled(Box)
const TImage = styled(Image)
const THeading = styled(Heading)

const bgProfesi = require('../../../assets/background/bg-profesi.png')
const GAME_SIZE = 10

export const MemoryGameScreen = (props: Props) => {
  const { materialTheme } = props.route.params
  const gameState = useAppSelector(state => state.reducer.memoryGameState)
  const dispatch = useAppDispatch()

  const [init, setInit] = useState(false)
  const [board, setBoard] = useState<LessonType[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<LessonType[]>([])
  const [section, setSection] = useState(1)

  const createGameBoard = () => {
    let board: LessonType[] = []

    if (!init) {
      const currentMaterial = getCurrentLesson(materialTheme)

      let material = shuffleArray(currentMaterial).slice(0, GAME_SIZE)

      // Add more if it isn't enough
      if (material.length !== GAME_SIZE) {
        const minus = GAME_SIZE - material.length
        const more = shuffleArray(currentMaterial).slice(0, minus)
        material = [...material, ...more]
      }
      const arr = shuffleArray(material.slice(0, 5))

      board = [...arr, ...arr]
      setSelectedMaterial(material)
      setInit(true)
    }

    if (section === 1) {
      dispatch(setMemoryGameState(initialMemoryGame))
    } else if (section === 2) {
      const nextInitialMemoryGame = {
        ...initialMemoryGame,
        point: gameState.point
      }
      const preProcessArr = shuffleArray(selectedMaterial.slice(5, 10))

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

  useEffect(() => {
    createGameBoard()
  }, [section])

  return (
    <PageWrapper image={bgProfesi}>
      <TBox className="h-full w-full items-center pt-5">
        <THeading size={'lg'} className="mb-4 rounded-md bg-amber-400 py-1 px-4 text-gray-100">
          Ronde {section}
        </THeading>
        {gameState.point === GAME_SIZE && (
          <THeading size={'lg'} className="mb-4 rounded-md bg-amber-400 py-1 px-4 text-gray-100">
            YOU WON
          </THeading>
        )}
        <HomeButton onPress={() => props.navigation.navigate('Main')} />
        <BackButton onPress={() => props.navigation.goBack()} />
        <TBox className="absolute right-8 top-4">
          <TImage size={'sm'} source={getCurrentTitle(materialTheme)} width={200} height={50} alt="home" />
        </TBox>
        <TBox className="absolute right-8 top-52">
          <Button size={'sm'} onPress={() => setSection(section + 1)}>
            Next
          </Button>
        </TBox>
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
