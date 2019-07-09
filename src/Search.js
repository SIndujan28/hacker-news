import React from "react";

export default function Search({value,onChange,onSubmit,children}) {
    return (
        <form  onSubmit={onSubmit}>
            {children}
            <input 
                type="text"
                value={value}
                onChange={onChange}
                />
        </form>
    )
}