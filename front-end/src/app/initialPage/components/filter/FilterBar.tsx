import React from "react";
import { SelectFilter } from "./SelectFilter";

const FilterBar = () => {
  return (
    <div className="flex items-center space-x-4 py-2 bg-white">
      <SelectFilter label="Período:" options={[{label:'Hoje', value:'hoje'}]}/>
      <SelectFilter label="Ordenado por:" options={[{label:'Nome', value:'nome'}]}/>
      <SelectFilter label="Status" options={[{label:'Andamento', value:'andamento'}]}/>
      <SelectFilter label="Tipo" options={[{label:'Vendas', value:'vendas'}]}/>


      <button className="text-gray-600 hover:text-red-600">Remover filtros</button>
    </div>
  );
};

export default FilterBar;
