const BandList = require('./band-list')

class Sockets {
  constructor(io) {
    this.io = io
    this.bandList = new BandList()
  }

  emitBands() {
    this.io.emit('BANDS-FROM-SERVER', { bands: this.bandList.getBands() })
  }

  events() {
    this.io.on('connection', (socket) => {
      // Emitir al cliente conectado, todas las bandas actuales
      socket.emit('BANDS-FROM-SERVER', { bands: this.bandList.getBands() })

      socket.on('ADD-BAND', (data) => {
        this.bandList.addBand(data.name)
        this.emitBands()
      })

      socket.on('EDIT-BAND', (band) => {
        this.bandList.editBand(band)
        this.emitBands()
      })

      socket.on('DELETE-BAND', (bandId) => {
        this.bandList.deleteBand(bandId)
        this.emitBands()
      })
    })
  }
}

module.exports = Sockets
