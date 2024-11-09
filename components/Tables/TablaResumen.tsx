'use client'
import React from 'react'
import { useContextpresup } from '@/context/ProviderPresup';

export default function TablaResumen() {
    const { gastos, presupuesto } = useContextpresup();

    function calcularTotalGastos(){
        let total = 0;
        for (let i = 0; i < gastos.length; i++) {
          total += gastos[i].monto;
        }
        return total;
    }

  return (
    <>
    <h4>TUS GASTOS FUERON:</h4>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripcion</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.idgasto}>
              <td>{gasto.monto}</td>
              <td>{gasto.categoria}</td>
              <td>{gasto.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>TU PRESUPUESTO PARA ESTE MES ESTABLECIDO FUE Lps. {presupuesto}</h4>
      <h4>Total Gastos este Mes: Lps. {calcularTotalGastos()}</h4>
      <h4>Sobrante: {presupuesto - calcularTotalGastos()}</h4>   
    </>
  )
}
