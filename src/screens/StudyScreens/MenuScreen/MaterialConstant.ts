export const Material1 = {
  profesi: require('../../../../assets/material/1/profesi.png'),
  arah: require('../../../../assets/material/1/arah-mata.png')
}

export const Material2 = {
  ruangSekolah: require('../../../../assets/material/2/ruangsekolah.png'),
  fasilitasSekolah: require('../../../../assets/material/2/fasilitassekolah.png')
}

export const Material3 = {
  peralatanSekolah: require('../../../../assets/material/3/peralatansekolah.png'),
  perangkatKelas: require('../../../../assets/material/3/perlatankelas.png'),
  warna: require('../../../../assets/material/3/warna.png')
}

export const Material4 = {
  kosakataAlamat: require('../../../../assets/material/4/kosakata-alamat.png'),
  angka: require('../../../../assets/material/4/angka.png')
}

export const Material5 = {
  ruangRumah: require('../../../../assets/material/5/ruang-dalam-rumah.png'),
  isiRuang: require('../../../../assets/material/5/isi-ruangan.png')
}

export const Material6 = {
  kegiatanHarian: require('../../../../assets/material/6/kegiatan-hari.png'),
  anggotaKeluarga: require('../../../../assets/material/6/anggota-keluarga.png')
}

export type MaterialType =
  | keyof typeof Material1
  | keyof typeof Material2
  | keyof typeof Material3
  | keyof typeof Material4
  | keyof typeof Material5
  | keyof typeof Material6
