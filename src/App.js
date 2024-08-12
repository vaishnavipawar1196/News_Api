import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar';
import React, { Component } from 'react';
import Card from './Components/Card';

export default class App extends Component {
  pageSize = 12;
  apiKey = "0e72c6937e2a4951a1031834f408d4f8";//process.env.REACT_APP_API_KEY


  state = {
    progress:0
  }
  setProgress = (progress) =>{
    this.setState({progress:progress})
  }
  render(){
  return (   
    <div className="App">    
    <Router>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
      <Navbar />     
      <Routes>
          <Route path="/" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize = {this.pageSize} country={'in'} category={'general'} />} />
          <Route path="/business" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize = {this.pageSize} country={'in'} category={'business'} />} />
          <Route path="/entertainment" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize = {this.pageSize} country={'in'} category={'entertainment'} />} />
          <Route path="/general" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="general2" pageSize = {this.pageSize} country={'in'} category={'general'} />} />
          <Route path="/health" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize = {this.pageSize} country={'in'} category={'health'} />} />
          <Route path="/science" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize = {this.pageSize} country={'in'} category={'science'} />} />
          <Route path="/sports" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize = {this.pageSize} country={'in'} category={'sports'} />} />
          <Route path="/technology" element={<Card setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize = {this.pageSize} country={'in'} category={'technology'} />} />
        </Routes>
    </Router>
    </div>
  );
}
}