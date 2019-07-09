import React from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'

const DEFAULT_QUERY='redux'
const PATH_BASE= 'https://hn.algolia.com/api/v1';
const PATH_SEARCH='/search'
const PARAM_SEARCH='query='

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      result:'',
      searchTerm:DEFAULT_QUERY,
    }
    this.onDismiss=this.onDismiss.bind(this)
    this.onSearchChange=this.onSearchChange.bind(this)
    this.onSearchSubmit=this.onSearchSubmit.bind(this)
    this.setSearchTopStories=this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories=this.fetchSearchTopStories.bind(this)
  }

  setSearchTopStories(result) {
    this.setState({result})
  }

  onSearchSubmit(event) {
    const {searchTerm}=this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(res=>res.json())
    .then((result)=>this.setSearchTopStories(result))
    .catch(error=>error);
  }

  onDismiss(id) {
    const isNotId=item=>item.objectID!==id;
    const updatedList=this.state.result.hits.filter(isNotId)
    this.setState({result:{...this.state.result,hits:updatedList}})
  }
  onSearchChange(event) {
    event.preventDefault()
    this.setState({searchTerm:event.target.value})
  }
  componentDidMount() {
    const {searchTerm}=this.state
    this.fetchSearchTopStories(searchTerm)
  }
  render() {
    const {searchTerm,result}=this.state
    
    return (
      <div>
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          />
          {result ?
        <Table 
          list={result.hits}
          onDismiss={this.onDismiss}
          /> : null}
      </div>
    )
  }
}

export default App;
