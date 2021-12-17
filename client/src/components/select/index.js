import React from 'react'
import { SelectContainer, SelectElement, SelectLabel, SelectOption } from './styled'

const Select = ({
    error,
    label,
    name,
    onChange,
    value,
    options
}) => {
    return (
        <SelectContainer>
            <SelectLabel
                htmlFor={name}>
                {label}
            </SelectLabel>
            <SelectElement
                error={error}
                name={name}
                onChange={onChange}
                value={value}
            >
                <SelectOption 
                    default 
                    value=""
                >
                    Selecciona una opción
                </SelectOption>
                {options.map((option, i) => (
                    <SelectOption
                        value={option.value}
                    >
                        {option.label}
                    </SelectOption>
                ))}
            </SelectElement>
        </SelectContainer>
    )
}

export default Select