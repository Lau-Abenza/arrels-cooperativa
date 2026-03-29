import Dexie from 'dexie'
import type { Table } from 'dexie'

export interface AnotacionLocal {
  id?: number
  uuid: string
  parcela_id: number
  texto: string
  foto_url?: string
  lat?: number
  lon?: number
  device_ts: string
  synced: boolean
}

export interface FichajeLocal {
  id?: number
  uuid: string
  tipo: 'entrada' | 'salida'
  lat?: number
  lon?: number
  notas?: string
  device_ts: string
  synced: boolean
}

export class ArrelsCampDB extends Dexie {
  anotaciones!: Table<AnotacionLocal>
  fichajes!: Table<FichajeLocal>

  constructor() {
    super('arrels-camp')
    this.version(1).stores({
      anotaciones: '++id, uuid, parcela_id, synced',
      fichajes: '++id, uuid, tipo, synced'
    })
  }
}

export const db = new ArrelsCampDB()