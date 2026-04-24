import { useState } from 'react'
import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Props {
  nombre: string
  municipio: string
  lat?: number | null
  lon?: number | null
  editable?: boolean
  onUbicacionChange?: (lat: number, lon: number) => void
}

function ClickHandler({ onClic }: { onClic: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onClic(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}

export default function MapaParcela({ nombre, municipio, lat, lon, editable = false, onUbicacionChange }: Props) {
  const centerLat = lat || 38.4197
  const centerLon = lon || -0.6445
  const [marcador, setMarcador] = useState<[number, number] | null>(
    lat && lon ? [lat, lon] : null
  )

  const handleClic = (newLat: number, newLon: number) => {
    if (!editable) return
    setMarcador([newLat, newLon])
    onUbicacionChange?.(newLat, newLon)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      {editable && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-700 flex items-center gap-2">
          <span>📍</span>
          <span>Haz clic en el mapa para marcar la ubicación de la parcela</span>
        </div>
      )}

      <MapContainer
        center={[centerLat, centerLon]}
        zoom={16}
        style={{ height: '400px', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <WMSTileLayer
          url="https://ovc.catastro.meh.es/cartografia/INSPIRE/spadgcwms.aspx"
          layers="CP.CadastralParcel"
          format="image/png"
          transparent={true}
          opacity={0.7}
          attribution='© <a href="https://www.catastro.meh.es/">Catastro</a>'
        />

        {editable && <ClickHandler onClic={handleClic} />}

        {marcador && (
          <Marker position={marcador}>
            <Popup>
              <strong>{nombre}</strong><br />
              {municipio}<br />
              <small>Lat: {marcador[0].toFixed(6)}, Lon: {marcador[1].toFixed(6)}</small>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="bg-[#f4f1ea] px-4 py-2 text-xs text-slate-500 flex items-center justify-between">
        <span>🗺️ Capa catastral — Sede Electrónica del Catastro</span>
        {marcador && (
          <span className="font-mono">
            {marcador[0].toFixed(5)}, {marcador[1].toFixed(5)}
          </span>
        )}
      </div>
    </div>
  )
}