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
import { MaterialType } from '../screens/StudyScreens/MenuScreen/MaterialConstant'

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
