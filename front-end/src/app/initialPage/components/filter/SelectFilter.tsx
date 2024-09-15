interface IProps{
    label:string
    options:{label:string, value:string | number}[]
}


export function SelectFilter({label,options}:IProps){
    return <>
     <div className="flex items-center space-x-2">
        <span className="font-semibold text-blue-600">{label}</span>
        <select className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600">
            {options.map((option, key)=>{
         return <option value={option.value} key={key}>{option.label}</option>
            })}
        </select>
      </div>
    </>
}