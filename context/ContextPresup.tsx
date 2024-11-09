'use client'

import { Gastos } from '@/models/gastos'
import React, { createContext } from 'react'

export const contextPresup = createContext({
    gastos: [] as Gastos[], 
    setGastos: (gasto: Gastos[]) => {}, 
    presupuesto: 0, 
    setPresupuesto: (presupuesto: number) => {} ,
    agregarPresupuesto: (presupuesto: number): void => {},
    
})