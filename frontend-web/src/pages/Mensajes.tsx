import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Mensaje {
    id: number,
    de_id: number,
    de_nombre: string,
    para_id: number,
    para_nombre: string,
    texto: string,
    foto_url: string,
    leido: boolean | null,
    fecha: string
}

export default function Mensajes() {
    const queryClient = useQueryClient()
    const [mostrarForm, setMostrarForm] = useState(false)
    const [form, setForm] = useState({
        para_id: '',
        para_nombre: '',
        texto: '',
        fecha: ''
    })

    const { data: mensajes = [], isLoading } = useQuery({
        queryKey: ['mensajes'],
        queryFn: async () => {
            const res = await axios.get('/api/mensajes/')
            return res.data as Mensaje[]
        }
    })
}