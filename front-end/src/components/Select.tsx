import {MultiValue, OnChangeValue, default as SelectLib} from 'react-select'

type option = {label:string, value:string}

interface IProps{
    options : option[],
    placeholder:string,
    onchange: (options: MultiValue<option>) => void;
}

export function SelectMulti({onchange,options,placeholder}:IProps){
    return <>
       <SelectLib
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