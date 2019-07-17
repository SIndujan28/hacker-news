import React from "react";

export default function Search({value,onChange,onSubmit,children}) {
    return (
        <form className="flex items-center" onSubmit={onSubmit}>
            {children}
            <input className="block w-1/4 ml-auto p-2 border rounded shadow mb-4 text-left bg-gray-800 text-white"
                type="text"
                value={value}
                onChange={onChange}
                />
                <button className="block border rounded shadow mb-4 p-2 bg-black text-center text-white font-sm" type="submit">Search</button>
        </form>
    )
}