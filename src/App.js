import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value : "",
      todoItems :[
      {title: "Go to school", isCompleted : true},
      {title: "Go to work", isCompleted : false},
      {title: "Go out with friend", isCompleted : false}
    ]};

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onKeyUp(even) {
    if (even.keyCode === 13) {
      let value = even.target.value
      if (!value) {
        return;
      }
      value = value.trim(); 
      if (!value) {
        return;
      }
      this.setState({
        value: '',
        todoItems :[
        {title: value, isCompleted: false},
        ...this.state.todoItems
        ]
      })
    }
  }

  onChange(even) {
    this.setState({
      value: even.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <input type="text" onKeyUp={this.onKeyUp} placeholder="Add a new item" value={this.state.value} onChange={this.onChange} />
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
