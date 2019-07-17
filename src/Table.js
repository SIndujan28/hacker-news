import React from 'react'
// import Trail from 'react-spring'

const Table=({list,onDismiss})=>{
    return (
        <div className="flex-col">
        {/* <Trail
            items={list}
            keys={item => item.objectID}
            from={{marginLeft:-20, opacity:0, transform:'translate3d(0,-40px,0)'}}
            to={{marginLeft:20, opacity:1, transform:'translate3d(0,0px,0)'}}
        >
            {item => props=> (
                <div style={props}>
                    {item}
                </div>
            )}
        </Trail> */}
        {list.map(item=>
        <div className="rounded-full  min-w-full bg-gray-400 p-4 mb-4" key={item.objectID}>
            <span className="font-black">
                <a href={item.url}>{item.title}</a>
            </span>
            <span className="p-1 italic">@{item.author}</span>
            <span >{item.num_comments}</span>
            <span className="p-1 font-normal">Points</span>
            <span className="p-1 font-semibold">^{item.points}</span>
            <span>
                <button className="inline-block bg-gray-500 hover:bg-gray-700 hover:text-white rounded-full px-1  float-right"
                    onClick={()=>onDismiss(item.objectID)}
                    type="button">x</button>
            </span> 
        </div>
        )
        }
        </div>
        )
    }
export default Table;