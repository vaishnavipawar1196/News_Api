import React, { Component } from 'react'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class Card extends Component {

    capitalized = ((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            page: 1,
            loading: false,
            totalResults: 0,
        };
        document.title = `News - ${this.capitalized(this.props.category)}`
    }
    
    async updateClick(){
        this.props.setProgress(20)
        this.setState({page : this.state.page +  1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading : true})
        this.props.setProgress(30)
        const data = await fetch(url)
        const json_data = await data.json()
        this.props.setProgress(100)
        console.log(json_data.articles)

        this.setState({
            articles: json_data.articles,
            loading: false,
            totalResults: json_data.totalResults
        })
       
    }

    async componentDidMount() {
        this.updateClick();
    }

    fetchMoreData = async () => {
        this.setState({page : this.state.page +  1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({loading : true})
        const data = await fetch(url)
        const json_data = await data.json()
        console.log(json_data.articles)

        this.setState({
            articles:this.state.articles.concat(json_data.articles),
            totalResults:json_data.totalResults,
            loading: false
        })
    }
    
    

  render() {
    return (
        <>
        
        <h2 className="text-center" style={{marginBottom:'20px', marginTop:'80px'}}>News for {this.capitalized(this.props.category)}</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll 
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}           
        >
        <div className="container my-3">
        <div className="row">
        {this.state.articles.map((element,index) =>{
            return <div className="col-md-4 d-flex justify-content-center my-3" key={index}>
            <div className="card">
                <img style={{width: '100%',height: '200px',boxShadow: '0 0 2px 0px #d0caca'}} className="card-img-top" src={element.urlToImage ? element.urlToImage  : "http://10x.world/img/blog/news_page.png"} alt="img1" />
                <div className="card-body">
                    <h5 className="card-title">{element.title ? element.title.slice(0,50) : "No title"}</h5>
                    <p className="card-text">{element.description ? element.description.slice(0,80) : "No description"}</p>
                    <p className="card-text"><small className="text-muted"><b>By </b>{element.author ? element.author : "Unknown author"} <b>on</b> {new Date(element.publishedAt).toGMTString()}</small></p>
                    <a href={element.url} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
            </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
     
      
      </>
    )
  }
}
