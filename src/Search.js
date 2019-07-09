import React from "react";

export default function Search({value,onChange,children}) {
    return (
        <form>
            {children}
            <input 
                type="text"
                value={value}
                onChange={onChange} />
        </form>
    )
}