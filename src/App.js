import { Component } from "react";

class App extends Component {

state = {
  content: null,
  author: null
}

async componentDidMount(){
  const url = 'https://api.quotable.io/random';
  const response = await fetch(url);
  const data = await response.json();
  this.setState({content: data.content, author: data.author})
  
}


  render() {
    return <div>
      <p>{this.state.content}</p>
      <p>{this.state.author}</p>

    </div>;
  }
}

export default App;
