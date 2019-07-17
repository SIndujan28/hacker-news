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
      results:null,
      searchKey:'',
      searchTerm:DEFAULT_QUERY,
      error:''
    }
    this.onDismiss=this.onDismiss.bind(this)
    this.onSearchChange=this.onSearchChange.bind(this)
    this.onSearchSubmit=this.onSearchSubmit.bind(this)
    this.setSearchTopStories=this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories=this.fetchSearchTopStories.bind(this)
    this.needtoSearchTopStories=this.needtoSearchTopStories.bind(this)
  }

  needtoSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  setSearchTopStories(result) {
    const {hits,page}=result
    const {searchKey,results}=this.state
    // const oldhits=page!==0 ?this.state.result.hits:[]
    const oldhits=results && results[searchKey] ? results[searchKey].hits :[]
    const updatedHits=[...oldhits,...hits]
    // this.setState({result:{hits:updatedHits,page}})
    this.setState({
      results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
      }
      });
  }

  onSearchSubmit(event) {
    const {searchTerm}=this.state
    this.setState({searchKey:searchTerm})
    if(this.needtoSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm) 
    }
    event.preventDefault()
  }

  fetchSearchTopStories(searchTerm,page=0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
    .then(res=>res.json())
    .then((result)=>this.setSearchTopStories(result))
    .catch(error=>this.setState({error:error}));
  }

  onDismiss(id) {
    const {searchKey,results}=this.state
    const {hits,page}=results[searchKey]
    const isNotId=item=>item.objectID!==id;
    // const updatedList=this.state.result.hits.filter(isNotId)
    const updatedList=hits.filter(isNotId)
    // this.setState({result:{...this.state.result,hits:updatedList}})
    this.setState({
      results: {
        ...results,
        [searchKey]:{hits:updatedList,page}
      }
    })
  }
  onSearchChange(event) {
    event.preventDefault()
    this.setState({searchTerm:event.target.value})
  }
  componentDidMount() {
    const {searchTerm}=this.state
    this.setState({searchKey:searchTerm})
    this.fetchSearchTopStories(searchTerm)
  }
  render() {
    const {searchTerm,results,searchKey,error}=this.state
      // const page=(result && result.page) || 0
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []
    return (
      <div className="w-3/4 mx-auto">
        <Search 
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          />
          {/* {result ? */}
          {error ? <p>Something went wrong</p>:
        <Table 
          list={list}
          onDismiss={this.onDismiss}
          /> }
          {/* : null} */}
        <div>
          {/* <button  className="block bg-gray-700 p-2 shadow hover:bg-gray-900 hover:text-gray-100 rounded " onClick={()=>this.fetchSearchTopStories(searchTsrm,page+1)}>More</button>*/}
          <button className="block bg-gray-700 p-2 shadow hover:bg-gray-900 hover:text-gray-100 rounded " onClick={()=>this.fetchSearchTopStories(searchKey,page+1)}>More</button>
          </div> 
      </div>
    )
  }
}

export default App;
