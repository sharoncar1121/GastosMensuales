'use client'
import { Gastos } from '@/models/gastos'
import React, { ReactNode, useContext, useState } from 'react'
import { contextPresup } from './ContextPresup';

interface VistaComponente{
    children: ReactNode
}

export default function ProviderPresup({children}: VistaComponente) {
    const [gastos, setGastos] = useState<Gastos[]>([]);
    const [presupuesto, setPresupuesto] = useState(0);

    
    function agregarPresupuesto(presup: number) {
        setPresupuesto(presup);
    }


  return (
   <contextPresup.Provider value={{gastos, setGastos,presupuesto, setPresupuesto, agregarPresupuesto}}>

    {children}

   </contextPresup.Provider>
  )
}

export function useContextpresup(){
    return useContext(contextPresup)
}