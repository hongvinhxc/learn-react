import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoItems :[
      {title: "Go to school", isCompleted : true},
      {title: "Go to work", isCompleted : false},
      {title: "Go out with friend", isCompleted : false}
    ]};
  }
  onItemClick(item) {
    return (even) => {
      const isCompleted = item.isCompleted;
      const {todoItems} = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {...item, isCompleted: !isCompleted},
          ...todoItems.slice(index+1)
        ]
      })
    };
  }
  render() {
    return (
      <div className="App">
        {
         this.state.todoItems.length > 0 && this.state.todoItems.map((item, index) => <TodoItem key={index} item={item} onClicked={this.onItemClick(item)}/>)
        }
        {
         this.state.todoItems.length === 0 && <h2>No item in this list</h2>
        }
      </div>
    );
  }
}

export default App;
