import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Packs from '../pages/Packs';
import PackCard from '../components/PackCard';
import { getPack, getPacks, valorEnProducto } from '../data/catalogo';

describe('TAREA-30 · Pruebas de Valor en Producto de los Packs', () => {
  const kitPack = getPack('kit-emprendedor');
  const ejecutivoPack = getPack('ejecutivo');
  const goldPack = getPack('gold');
  const familiarPack = getPack('familiar');
  const empresarialPack = getPack('empresarial');

  // PRUEBA 1
  it('1 · valorEnProducto(Gold) = 2000', () => {
    expect(goldPack).toBeDefined();
    expect(goldPack.precio).toBe(1200);
    expect(goldPack.descuentoEnPack).toBe(40);
    expect(valorEnProducto(goldPack)).toBe(2000);
  });

  // PRUEBA 2
  it('2 · valorEnProducto(Ejecutivo) = 600', () => {
    expect(ejecutivoPack).toBeDefined();
    expect(ejecutivoPack.precio).toBe(360);
    expect(ejecutivoPack.descuentoEnPack).toBe(40);
    expect(valorEnProducto(ejecutivoPack)).toBe(600);
  });

  // PRUEBA 3
  it('3 · valorEnProducto(Familiar) = 8000', () => {
    expect(familiarPack).toBeDefined();
    expect(familiarPack.precio).toBe(4000);
    expect(familiarPack.descuentoEnPack).toBe(50);
    expect(valorEnProducto(familiarPack)).toBe(8000);
  });

  // PRUEBA 4
  it('4 · valorEnProducto(Empresarial) = 17778', () => {
    expect(empresarialPack).toBeDefined();
    expect(empresarialPack.precio).toBe(8000);
    expect(empresarialPack.descuentoEnPack).toBe(55);
    // 8000 / (1 - 0.55) = 8000 / 0.45 = 17777.777... -> 17778
    expect(valorEnProducto(empresarialPack)).toBe(17778);
  });

  // PRUEBA 5 (CRÍTICA)
  it('5 · valorEnProducto(Kit) = null', () => {
    expect(kitPack).toBeDefined();
    expect(kitPack.precio).toBe(120);
    expect(kitPack.descuentoEnPack).toBeNull();
    expect(valorEnProducto(kitPack)).toBeNull();
  });

  // PRUEBA 6
  it('6 · La tarjeta del Kit NO contiene "Te llevas"', () => {
    render(
      <MemoryRouter>
        <PackCard
          id={kitPack.id}
          name={kitPack.nombre}
          price={`S/. ${kitPack.precio}`}
          lead={kitPack.lead}
          features={kitPack.beneficios}
          valorEnProducto={valorEnProducto(kitPack)}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Kit Emprendedor')).toBeInTheDocument();
    expect(screen.queryByText(/Te llevas/i)).not.toBeInTheDocument();
  });

  // PRUEBA 7
  it('7 · La tarjeta del Gold SÍ contiene el valor calculado con separador de miles', () => {
    render(
      <MemoryRouter>
        <PackCard
          id={goldPack.id}
          name={goldPack.nombre}
          price={`S/. ${goldPack.precio.toLocaleString('es-PE')}`}
          lead={goldPack.lead}
          features={goldPack.beneficios}
          featured={goldPack.destacado}
          ribbon={goldPack.etiqueta}
          valorEnProducto={valorEnProducto(goldPack)}
        />
      </MemoryRouter>
    );

    const valorGoldFmt = valorEnProducto(goldPack).toLocaleString('es-PE');
    expect(valorGoldFmt).toBe('2' + ',000');
    expect(screen.getByText(new RegExp(valorGoldFmt))).toBeInTheDocument();
    expect(screen.getByText(`Te llevas S/. ${valorGoldFmt} en producto`)).toBeInTheDocument();
  });

  // PRUEBA 8 (CRÍTICA - Demuestra que NO está escrito a mano)
  it('8 · Si se cambia el precio del Gold a 1500 en config, el valor pasa a 2500', () => {
    // Si el precio del Gold cambiara a 1500 con el mismo 40% de descuento en pack:
    // 1500 / (1 - 0.40) = 1500 / 0.60 = 2500
    const goldModificado = {
      ...goldPack,
      precio: 1500,
    };

    const nuevoValor = valorEnProducto(goldModificado);
    expect(nuevoValor).toBe(2500);

    // Verificamos que al renderizar la tarjeta con ese valor recalculado, rinde el nuevo valor
    render(
      <MemoryRouter>
        <PackCard
          id={goldModificado.id}
          name={goldModificado.nombre}
          price={`S/. ${goldModificado.precio.toLocaleString('es-PE')}`}
          lead={goldModificado.lead}
          features={goldModificado.beneficios}
          valorEnProducto={nuevoValor}
        />
      </MemoryRouter>
    );

    const nuevoValorFmt = nuevoValor.toLocaleString('es-PE');
    expect(screen.getByText(`Te llevas S/. ${nuevoValorFmt} en producto`)).toBeInTheDocument();
  });

  // PRUEBA INTEGRAL EN LA PÁGINA COMPLETA DE PACKS
  it('renderiza la página Packs con la línea en los 4 packs y sin ella en el Kit', () => {
    render(
      <MemoryRouter>
        <Packs />
      </MemoryRouter>
    );

    // Kit NO tiene "Te llevas"
    // Los otros 4 packs SÍ tienen "Te llevas" con sus montos calculados
    const esperadoEjecutivo = `Te llevas S/. ${valorEnProducto(ejecutivoPack).toLocaleString('es-PE')} en producto`;
    const esperadoGold = `Te llevas S/. ${valorEnProducto(goldPack).toLocaleString('es-PE')} en producto`;
    const esperadoFamiliar = `Te llevas S/. ${valorEnProducto(familiarPack).toLocaleString('es-PE')} en producto`;
    const esperadoEmpresarial = `Te llevas S/. ${valorEnProducto(empresarialPack).toLocaleString('es-PE')} en producto`;

    expect(screen.getByText(esperadoEjecutivo)).toBeInTheDocument();
    expect(screen.getByText(esperadoGold)).toBeInTheDocument();
    expect(screen.getByText(esperadoFamiliar)).toBeInTheDocument();
    expect(screen.getByText(esperadoEmpresarial)).toBeInTheDocument();

    const lineasTeLlevas = screen.getAllByText(/Te llevas/);
    expect(lineasTeLlevas.length).toBe(4);
  });
});