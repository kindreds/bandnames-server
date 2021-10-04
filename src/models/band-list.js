const Band = require('./band')

class BandList {
  constructor() {
    this.bands = [
      new Band('Gavin Dance'),
      new Band('Crown The Empire'),
      new Band('Asking Alexandria'),
      new Band('Bring Me The Horizon')
    ]
  }

  addBand(name) {
    const newBand = new Band(name)
    this.bands = [...this.bands, newBand]
  }

  editBand(band) {
    const bands = this.bands
    this.bands = bands.map((b) => (b.id === band.id ? band : b))
  }

  deleteBand(bandId) {
    const bands = this.bands
    this.bands = bands.filter(({ id }) => id !== bandId)
  }

  getBands() {
    return this.bands
  }
}

module.exports = BandList
