import React from 'react';
import './App.css';
import Search from './Search'
import Table from './Table'

const DEFAULT_QUERY='redux'
const DEFAULT_HPP='10'

const PATH_BASE= 'https://hn.algolia.com/api/v1';
const PATH_SEARCH='/search'
const PARAM_SEARCH='query='
const PARAM_PAGE='page='
const PARAM_HPP='hitsPerPage='


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
    const {hits,page}=result

    const oldhits=page!==0 ?this.state.result.hits:[]
    const updatedHits=[...oldhits,...hits]
    this.setState({result:{hits:updatedHits,page}})
  }

  onSearchSubmit(event) {
    const {searchTerm}=this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  fetchSearchTopStories(searchTerm,page=0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
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
    const page=(result && result.page) || 0

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
        <div>
          <button onClick={()=>this.fetchSearchTopStories(searchTerm,page+1)}>More</button>
        </div>
      </div>
    )
  }
}

export default App;
