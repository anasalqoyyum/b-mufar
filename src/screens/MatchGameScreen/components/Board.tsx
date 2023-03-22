import { Center, Text, View } from 'native-base'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { DraxProvider, DraxView, DraxSnapbackTargetPreset } from 'react-native-drax'
import { LessonType } from '../../../constants/Models/Lesson'
import { Image } from '@rneui/themed'
import { ActivityIndicator } from 'react-native'

interface WordBlockProps {
  name: string
  currentMoving: string
  setCurrentMoving: (val: string) => void
  setPoint: () => void
}

interface MatchUpProps {
  setIsWin: (val: boolean) => void
  gameSize: number
  board: Record<string, LessonType[]>
}

const TCenter = styled(Center)
const TView = styled(View)

const WordBlock = ({ name, setCurrentMoving }: Omit<WordBlockProps, 'currentMoving' | 'setPoint'>) => {
  const [isVisible, setIsVisible] = useState(true)

  return (
    <DraxView
      // style={[styles.wordBlock, styles.centeredContent]}
      style={[styles.wordBlock, styles.centeredContent, !isVisible && styles.invisible]}
      draggingStyle={styles.dragging}
      dragReleasedStyle={styles.dragging}
      onDragStart={() => {
        setCurrentMoving(name)
      }}
      onDragEnd={() => {
        setCurrentMoving('')
      }}
      onDragDrop={() => {
        setCurrentMoving('')
      }}
      dragPayload={{ text: name, setIsVisible }}>
      <Text fontSize={'12'}>{name}</Text>
    </DraxView>
  )
}

const WordBlockBank = ({ name, currentMoving, setPoint }: Omit<WordBlockProps, 'setCurrentMoving'>) => {
  const [isCorrect, setIsCorrect] = useState(false)
  const receptive = !isCorrect && currentMoving === name

  return (
    <DraxView
      style={[styles.centeredContent, styles.receptive, isCorrect ? styles.wordBlock : styles.wordBlockBank]}
      otherDraggingStyle={styles.receiving}
      // TODO: Debugging Purpose
      // receivingStyle={styles.receiving}
      receptive={receptive}
      onReceiveDragDrop={({ dragged: { payload } }) => {
        setPoint()
        setIsCorrect(true)
        payload?.setIsVisible?.(false)
        return DraxSnapbackTargetPreset.None
      }}>
      <Text style={isCorrect ? null : styles.hidden} fontSize={'11'}>
        {name}
      </Text>
    </DraxView>
  )
}

const Card = ({ material }: { material: LessonType }) => {
  const { img, id } = material

  return (
    <View style={[styles.card]} rounded="lg" overflow="hidden" borderColor="white" borderWidth="3" backgroundColor="coolGray.50">
      <TCenter className="mt-1">
        <Image style={[styles.image, { width: 50, height: 50 }]} PlaceholderContent={<ActivityIndicator />} source={img} alt="image" />
        <Text marginTop={'3'} fontSize={'9'} fontWeight={'semibold'}>
          {id}
        </Text>
      </TCenter>
    </View>
  )
}

export const MatchUpBoard = ({ setIsWin, gameSize, board }: MatchUpProps) => {
  const [currentMoving, setCurrentMoving] = useState('')
  const [point, setPoint] = useState(0)

  const updatePoint = () => {
    const newPoint = point + 1
    setPoint(newPoint)

    if (newPoint === gameSize) {
      setIsWin(true)
    }
  }

  return (
    <DraxProvider>
      <View style={styles.container}>
        <View style={styles.paletteRow}>
          <View style={styles.paletteCol}>
            {board.answer.slice(0, 4).map((val, idx) => {
              return <WordBlock key={`c${idx}`} name={val.ar} setCurrentMoving={setCurrentMoving} />
            })}
          </View>
          <View style={styles.palette}>
            <View style={styles.paletteRow}>
              {board.question.slice(0, 4).map((val, idx) => {
                return (
                  <TView key={`a${idx}`} className="mx-2">
                    <Card material={val} />
                    <WordBlockBank name={val.ar} currentMoving={currentMoving} setPoint={updatePoint} />
                  </TView>
                )
              })}
            </View>
            <View style={styles.paletteRow}>
              {board.question.slice(4, 8).map((val, idx) => {
                return (
                  <TView key={`b${idx}`} className="mx-2">
                    <Card material={val} />
                    <WordBlockBank name={val.ar} currentMoving={currentMoving} setPoint={updatePoint} />
                  </TView>
                )
              })}
            </View>
          </View>
          <View style={styles.paletteCol}>
            {board.answer.slice(4, 8).map((val, idx) => {
              return <WordBlock key={`c${idx}`} name={val.ar} setCurrentMoving={setCurrentMoving} />
            })}
          </View>
        </View>
      </View>
    </DraxProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  receptive: {
    borderColor: '#f6a21d',
    borderWidth: 1
  },
  receiving: {
    borderColor: '#e99126',
    borderWidth: 2
  },
  dragging: {
    opacity: 0
  },
  centeredContent: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wordBlock: {
    width: 65,
    height: 30,
    borderRadius: 6,
    borderColor: '#f6a21d',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: '#fcbf85'
  },
  wordBlockBank: {
    width: 70,
    height: 32,
    borderRadius: 6,
    borderColor: '#f6a21d',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: '#efefef'
  },
  card: {
    width: 90,
    height: 105,
    marginBottom: 15
  },
  palette: {
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: 4
  },
  paletteRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8
  },
  paletteCol: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginVertical: 20
  },
  hidden: {
    display: 'none'
  },
  marginTop: {
    marginTop: 2
  },
  invisible: {
    opacity: 0
  },
  image: {
    zIndex: 10
  }
})
