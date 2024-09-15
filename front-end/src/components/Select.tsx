import {MultiValue, OnChangeValue, default as SelectLib} from 'react-select'

type option = {label:string, value:string}

interface IProps{
    options : option[],
    placeholder:string,
    onchange: (options: MultiValue<option>) => void;
    value:{ value: string, label: string }[],
}

export function SelectMulti({onchange,options,placeholder, value}:IProps){
    return <>
       <SelectLib
            value={value}
            options={options}
            placeholder={placeholder}
            noOptionsMessage={() => 'Nenhuma opção disponível'}
            onChange={(options: OnChangeValue<option, true>) => 
                onchange(options as MultiValue<option>)
            }
            isLoading={false}
            isMulti
          />
    </>
}