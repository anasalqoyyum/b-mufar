import { Arah } from '../constants/lessons/1-Perkenalan/Arah'
import { Profesi } from '../constants/lessons/1-Perkenalan/Profesi'
import { FasilitasSekolah } from '../constants/lessons/2-Fasilitas/FasilitasSekolah'
import { RuangSekolah } from '../constants/lessons/2-Fasilitas/RuangSekolah'
import { PeralatanSekolah } from '../constants/lessons/3-PeralatanSekolah/PeralatanSekolah'
import { PerangkatKelas } from '../constants/lessons/3-PeralatanSekolah/PerangkatKelas'
import { Warna } from '../constants/lessons/3-PeralatanSekolah/Warna'
import { Alamat } from '../constants/lessons/4-Alamat/Alamat'
import { Angka } from '../constants/lessons/4-Alamat/Angka'
import { IsiRuangan } from '../constants/lessons/5-Rumah/IsiRuangan'
import { RuanganRumah } from '../constants/lessons/5-Rumah/RuanganRumah'
import { AnggotaKeluarga } from '../constants/lessons/6-Keluarga/Anggota'
import { KegiatanHarian } from '../constants/lessons/6-Keluarga/KegiatanHarian'
import { LessonType, MaterialId } from '../constants/Models/Lesson'
import {
  Material1,
  Material2,
  Material3,
  Material4,
  Material5,
  Material6,
  MaterialType
} from '../screens/StudyScreens/MenuScreen/MaterialConstant'

const title11 = require('../../assets/title/1-1.png')
const title12 = require('../../assets/title/1-2.png')
const title21 = require('../../assets/title/2-1.png')
const title22 = require('../../assets/title/2-2.png')
const title31 = require('../../assets/title/3-1.png')
const title32 = require('../../assets/title/3-2.png')
const title33 = require('../../assets/title/3-3.png')
const title41 = require('../../assets/title/4-1.png')
const title42 = require('../../assets/title/4-2.png')
const title51 = require('../../assets/title/5-1.png')
const title52 = require('../../assets/title/5-2.png')
const title61 = require('../../assets/title/6-1.png')
const title62 = require('../../assets/title/6-2.png')

const bgSekolah = require('../../assets/background/bg-sekolah.png')
const bgRumah = require('../../assets/background/bg-rumah.png')
const bgWarna = require('../../assets/background/bg-warna.png')
const bgAngka = require('../../assets/background/bg-angka.png')
const bgArah = require('../../assets/background/bg-arah.png')
const bgRuangRumah = require('../../assets/background/bg-ruangrumah.png')
const bgIsiRuang = require('../../assets/background/bg-isiruang.png')
const bgJalan = require('../../assets/background/bg-jalan.png')
const bgKenal = require('../../assets/background/bg-perkenalan.png')
const bgKegiatan = require('../../assets/background/bg-kegiatanharian.png')
const bgFasilitassekolah = require('../../assets/background/bg-fasilitassekolah.png')
const bgPeralatanSekolah = require('../../assets/background/bg-peralatansekolah.png')
const bgPerangkatkelaws = require('../../assets/background/bg-perangkatkelaws.png')

export const getCurrentLesson = (materialTheme: MaterialType) => {
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

export const getCurrentTitle = (materialTheme: MaterialType) => {
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

export const getCurrentMaterial = (materialId: MaterialId) => {
  switch (materialId) {
    case 1:
      return Material1
    case 2:
      return Material2
    case 3:
      return Material3
    case 4:
      return Material4
    case 5:
      return Material5
    case 6:
      return Material6
  }
}

export const getCurrentBackground = (materialTheme: MaterialType) => {
  switch (materialTheme) {
    case 'profesi':
      return bgKenal
    case 'arah':
      return bgArah
    case 'fasilitasSekolah':
      return bgFasilitassekolah
    case 'ruangSekolah':
      return bgSekolah
    case 'peralatanSekolah':
      return bgPeralatanSekolah
    case 'perangkatKelas':
      return bgPerangkatkelaws
    case 'warna':
      return bgWarna
    case 'kosakataAlamat':
      return bgJalan
    case 'angka':
      return bgAngka
    case 'ruangRumah':
      return bgRuangRumah
    case 'isiRuang':
      return bgIsiRuang
    case 'anggotaKeluarga':
      return bgRumah
    case 'kegiatanHarian':
      return bgKegiatan
  }
}

export const shuffleArray = (array: LessonType[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }

  return array
}
