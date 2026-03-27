import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import Layout from '../components/Layout'

interface Planes_Accion {
    id: number,
    socio_id: number,
    socio_nombre: string,
    ingeniero_id: number,
    ingeniero_nombre: string,
    titulo: string,
    descripcion: string,
    estado: string,
    fecha: string
}