'use client'

import React, { useState, useEffect } from 'react';
import { useContextpresup } from '@/context/ProviderPresup';
import { Gastos } from '@/models/gastos';

export default function IngresoGasto  () {
  const { gastos, setGastos, presupuesto } = useContextpresup();
  const [monto, setMonto] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');
  const [gastoSeleccionado, setGastoSeleccionado] = useState<Gastos | null>(null);

  useEffect(() => {
    obtenerGastos();
  }, []);

  const obtenerGastos = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gasto`);
      if (!response.ok) throw new Error("Error al obtener gastos");
      const data = await response.json();
      setGastos(data);
    } catch (error) {
      console.error("Error al obtener gastos:", error);
    }
  };

  const guardarGasto = async () => {
    try {
      const nuevoGasto = { monto, descripcion, categoria, fecha };
      let response;

      if (gastoSeleccionado) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gasto/${gastoSeleccionado.idgasto}`, { 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoGasto),
        });
      } else { 
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gasto`, { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoGasto),
        });
      }

      if (!response.ok) throw new Error("Error al guardar gasto");
      
      obtenerGastos(); 
      setMonto(0);
      setDescripcion('');
      setCategoria('');
      setFecha('');
      setGastoSeleccionado(null); 
    } catch (error) {
      console.error("Error al guardar gasto:", error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    guardarGasto();
  };

  const editarGasto = (gasto: Gastos) => {
    setMonto(Number(gasto.monto));
    setCategoria(gasto.categoria);
    setFecha(gasto.fecha);
    setGastoSeleccionado(gasto);
  };

  const eliminarGasto = async (id: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gasto/${id}`, { 
        method: 'DELETE',
      });
      if (!response.ok) throw new Error("Error al eliminar gasto");
      
      obtenerGastos();
    } catch (error) {
      console.error("Error al eliminar gasto:", error);
    }
  };

  return (
   <>
    <div className="container">
      <h4>Presupuesto Establecido Lps. {presupuesto}</h4>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="row mb-3">
          <div className="col">
            <input
              className="form-control text-center"
              placeholder="Monto"
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Ingrese categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control text-center"
              placeholder="Fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">{gastoSeleccionado ? 'Actualizar Gasto' : 'Guardar Gasto'}</button>
      </form>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>Monto</th>
            <th>Descripcion</th>
            <th>Fecha</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.idgasto}>
              <td>{gasto.monto}</td>
              <td>{gasto.categoria}</td>
              <td>{gasto.fecha}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => editarGasto(gasto)}>Editar</button>
              </td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarGasto(gasto.idgasto)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   </>
  );
};
