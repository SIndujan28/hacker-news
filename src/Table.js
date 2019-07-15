import React from 'react'
// import Trail from 'react-spring'

const Table=({list,onDismiss})=>{
    return (
        <div>
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
        <div key={item.objectID}>
            <span>
                <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>Points</span>
            <span>{item.points}</span>
            <span>
                <button 
                    onClick={()=>onDismiss(item.objectID)}
                    type="button">Dismiss</button>
            </span> 
        </div>
        )
        }
        </div>
        )
    }
export default Table;