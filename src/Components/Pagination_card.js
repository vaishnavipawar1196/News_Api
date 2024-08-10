import React, { Component } from 'react'
import Spinner from './Spinner';

export default class Card extends Component {

    capitalized = ((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    })

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            page: 1,
            loading: false
        };
        document.title = `News - ${this.capitalized(this.props.category)}`
    }
    
    async updateClick(){
        this.setState({loading : true})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0e72c6937e2a4951a1031834f408d4f8&page=${this.state.page -  1}&pageSize=${this.props.pageSize}`
        const data = await fetch(url)
        const json_data = await data.json()
        console.log(json_data.articles)

        this.setState({
            articles:json_data.articles,
            loading:false
        })
       
    }

    async componentDidMount() {
        this.updateClick();
    }


    handlePreClick = async () =>{
        
        this.setState({
            page : this.state.page -  1
        })
        this.updateClick()
    }

    handleNextClick = async () =>{
        
        this.setState({
            page : this.state.page +  1
        })
        this.updateClick()
    }
    
  render() {
    return (
        <>
        <div className="container my-5">
        <h2 className="text-center">News for {this.capitalized(this.props.category)}</h2>
        {this.state.loading && <Spinner  />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element,index) =>{
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

      <div className="container d-flex justify-content-between mb-5">
        <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.handlePreClick}>&larr; Previous</button>
        <button className="btn btn-primary" disabled={this.state.page +  1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </>
    )
  }
}
