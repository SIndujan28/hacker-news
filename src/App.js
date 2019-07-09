import React from 'react';
import './App.css';

const list = [ { title: 'React',
                 url: 'https://facebook.github.io/react/', 
                 author: 'Jordan Walke', 
                 num_comments: 3, 
                 points: 4, 
                 objectID: 0, },
                 { title: 'Graphql',
                 url: 'https://graphql.org/', 
                 author: 'Facebook', 
                 num_comments: 3, 
                 points: 3, 
                 objectID: 1, },
                 { title: 'React-redux',
                 url: 'https://redux.js.org/', 
                 author: 'Dan Abramov and Andrew Clark', 
                 num_comments: 3, 
                 points: 3, 
                 objectID: 2, },
                 
                 ];

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      list:list,
      searchTerm:'',
    }
    this.onDismiss=this.onDismiss.bind(this)
    this.onSearchChange=this.onSearchChange.bind(this)
  }

  onDismiss(id) {
    const isNotId=item=>item.objectID!==id;
    const updatedList=this.state.list.filter(isNotId)
    this.setState({list:updatedList})
  }
  onSearchChange(event) {
    event.preventDefault()
    this.setState({searchTerm:event.target.value})
  }

  render() {
    const {searchTerm,list}=this.state
    return (
      <div>
        <form>

          <input type="text"
                onChange={this.onSearchChange}
                value={searchTerm}
                />
        </form>
       {list.filter(isSearched(searchTerm)).map(item=>
         <div key={item.objectID}>
           <span>
             <a href={item.url}>{item.title}</a>
           </span>
           <span>{item.author}</span>
           <span>{item.num_comments}</span>
           <span>{item.points}</span>
          <span>
          <button 
            onClick={()=>this.onDismiss(item.objectID)}
            type="button">Dismiss</button>
          </span> 
          </div>
        )}
      </div>
    )
  }
}

export default App;
