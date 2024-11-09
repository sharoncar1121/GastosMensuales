'use client'
import { useContextpresup } from '@/context/ProviderPresup'
import React, { useEffect, useState } from 'react'

export default function IngresoPresup() {
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const [mostrarAlerta2, setMostrarAlerta2] = useState(false)
    const [inputPresupuesto, setInputPresupuesto] = useState('');
    const{agregarPresupuesto, presupuesto, gastos}= useContextpresup()

    const handleInputChange = (e:any) => {
        setInputPresupuesto(e.target.value);
      };

      const handleSubmit = (e:any) => {
        e.preventDefault();
        agregarPresupuesto(Number(inputPresupuesto));
        alert(`Presupuesto guardado: ${inputPresupuesto}`);
        setInputPresupuesto('');
      };

      const calcularTotalGastos = () => {
        let total = 0;
        for (let i = 0; i < gastos.length; i++) {
            total += gastos[i].monto;
        }
        return total;
     };

     const verificarPorcentajeGastos = () => {
        const totalGastos = calcularTotalGastos();
        const porcentaje = (totalGastos / presupuesto) * 100;

        if (porcentaje >= 80) {
            setMostrarAlerta(true);  
        } else {
            setMostrarAlerta(false);  
        }
    };

    const verificarSuperar = () => {
        const totalGastos = calcularTotalGastos();
        if (totalGastos > presupuesto) {
            setMostrarAlerta2(true);
        }else{
            setMostrarAlerta2(false);
        }
    };

    useEffect(() => {
        if (presupuesto > 0) {
            verificarPorcentajeGastos();
            verificarSuperar();
        }
    }, [gastos, presupuesto]); 


  return (
    <>
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
    <div className="text-center">
      <h3>Establecer Presupuesto Mensual</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="number"
            className="form-control text-center"
            placeholder="Monto de presupuesto Mensual"
            value={inputPresupuesto}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Presupuesto
        </button>
        <h1>SU presupuesto es: {presupuesto}</h1>
      </form>
      {mostrarAlerta && (
        <div className="alert alert-warning mt-5" role="alert">
           Has alcanzado el 80% de tu presupuesto.
        </div>
      )}
      {mostrarAlerta2 && (
        <div className="alert alert-warning mt-5" role="alert">
        Has alcanzado el sobrepasado tu presupuesto mensual, ajustalo.
        </div>
      )}
    </div>
  </div>
    </>
  )
}
