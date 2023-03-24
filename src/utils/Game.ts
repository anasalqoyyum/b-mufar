/**
 * Memory Game:
 * Level 1-2 : 2x2 kosakata 2 ronde
 * Level 3-4 : 3x3kosakata 2 ronde
 * Level 5-6: 4x4 kosakata 2 ronde
 *
 * MatchUp:
 * Level 1-3 : 6 kosakata aja
 * Level 4-6 : 10 kosakata
 *
 * Penilaian:
 * level 1-4: bintang 3 (1 menit), bintang 2 (2 menit), bintang 1 (3 menit/lebih)
 */

import { GameType } from '../constants/Models/Game'

export const calculateCurrentGameSize = (gameType: GameType, level: number) => {
  switch (gameType) {
    case 'memory':
      if (level === 1 || level === 2) {
        return 4
      } else if (level === 3 || level === 4) {
        return 6
      } else if (level === 5 || level === 6) {
        return 8
      } else {
        return 8
      }
    case 'match':
      if (level === 1 || level === 2 || level === 3) {
        return 6
      } else if (level === 4 || level === 5 || level === 6) {
        return 10
      } else {
        return 8
      }
  }
}
