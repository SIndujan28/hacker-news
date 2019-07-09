import React from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'

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
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          />
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
      </div>
    )
  }
}

export default App;
