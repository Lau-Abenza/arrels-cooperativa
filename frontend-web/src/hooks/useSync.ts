import { useState, useEffect, useCallback } from 'react'
import { db } from '../db'
import axios from 'axios'

export function useSync() {
  const [online, setOnline] = useState(navigator.onLine)
  const [sincronizando, setSincronizando] = useState(false)
  const [pendientes, setPendientes] = useState(0)

  // Contar registros pendientes
  const contarPendientes = useCallback(async () => {
    const anotaciones = await db.anotaciones.where('synced').equals(0).count()
    const fichajes = await db.fichajes.where('synced').equals(0).count()
    setPendientes(anotaciones + fichajes)
  }, [])

  // Sincronizar con el servidor
  const sincronizar = useCallback(async () => {
    if (!navigator.onLine || sincronizando) return
    setSincronizando(true)
    try {
      // Sincronizar anotaciones
      const anotacionesPendientes = await db.anotaciones
        .where('synced').equals(0).toArray()

      if (anotacionesPendientes.length > 0) {
        const res = await axios.post('/api/sync/batch', {
          anotaciones: anotacionesPendientes.map(a => ({
            parcela_id: a.parcela_id,
            texto: a.texto,
            foto_url: a.foto_url,
            lat: a.lat,
            lon: a.lon,
            device_ts: a.device_ts,
            uuid: a.uuid
          }))
        })
        if (res.data.ok) {
          await db.anotaciones
            .where('synced').equals(0)
            .modify((a: AnotacionLocal) => { a.synced = true })
        }
      }

      await contarPendientes()
    } catch (err) {
      console.log('Sin conexión, reintentando más tarde')
    } finally {
      setSincronizando(false)
    }
  }, [sincronizando, contarPendientes])

  // Detectar cambios de conexión
  useEffect(() => {
    const handleOnline = () => {
      setOnline(true)
      sincronizar()
    }
    const handleOffline = () => setOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    contarPendientes()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [sincronizar, contarPendientes])

  return { online, sincronizando, pendientes, sincronizar }
}