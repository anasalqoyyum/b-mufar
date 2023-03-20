import { Center, Image, Text, View } from 'native-base'
import { styled } from 'nativewind'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { DraxProvider, DraxView, DraxSnapbackTargetPreset } from 'react-native-drax'
import { LessonType } from '../../../constants/Models/Lesson'

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

const TImage = styled(Image)
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
      <Text fontSize={'9'}>{name}</Text>
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
      <Text style={isCorrect ? null : styles.hidden} fontSize={'10'}>
        {name}
      </Text>
    </DraxView>
  )
}

const Card = ({ material }: { material: LessonType }) => {
  const { img } = material

  return (
    <View style={[styles.card]} rounded="lg" overflow="hidden" borderColor="white" borderWidth="3" backgroundColor="coolGray.50">
      <TCenter className="mt-1">
        <TImage className="z-10" size={['12', '16']} source={img} alt="image" />
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
        <View style={[styles.palette, styles.marginTop]}>
          <View style={styles.paletteRow}>
            {board.answer.map((val, idx) => {
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
    padding: 10,
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
    width: 50,
    height: 25,
    borderRadius: 6,
    borderColor: '#f6a21d',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: '#fcbf85'
  },
  wordBlockBank: {
    width: 55,
    height: 27,
    borderRadius: 6,
    borderColor: '#f6a21d',
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: '#efefef'
  },
  card: {
    width: 75,
    height: 90,
    marginBottom: 15
  },
  palette: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  paletteRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 8
  },
  hidden: {
    display: 'none'
  },
  marginTop: {
    marginTop: 2
  },
  invisible: {
    opacity: 0
  }
})
