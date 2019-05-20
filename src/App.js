import React, { Component } from 'react';
import './App.css';
import checkall from './img/checkall.svg';
import checked from './img/completed.svg';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor() {
    super();
    let todoItems = [
      { title: "Go to school", isCompleted: true },
      { title: "Go to work", isCompleted: true },
      { title: "Go out with friend", isCompleted: false }
    ];

    if (todoItems.every(item => item.isCompleted === true))
      this.state = {
        value: "",
        todoItems: todoItems,
        checkedStatus: true
      };
    else
      this.state = {
        value: "",
        todoItems: todoItems,
        checkedStatus: false
      };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.checkAll = this.checkAll.bind(this);
    this.clearItems = this.clearItems.bind(this);
  }

  checkAll() {

    const { todoItems } = this.state
    let checkedStatus = todoItems.every(item => item.isCompleted === true);
    let allCheck = [];

    if (!checkedStatus)
      allCheck = todoItems.map(item => {
        return { title: item.title, isCompleted: true }
      });
    else
      allCheck = todoItems.map(item => {
        return { title: item.title, isCompleted: false }
      });

    this.setState({
      checkedStatus: !checkedStatus,
      todoItems: allCheck
    })
  }

  onItemClick(item) {
    return (even) => {
      const isCompleted = item.isCompleted;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          { ...item, isCompleted: !isCompleted },
          ...todoItems.slice(index + 1)
        ]
      });

      let checkList = todoItems.slice(0, index).concat(todoItems.slice(index + 1));
      let checkedNewStatus = checkList.every(item => item.isCompleted === !isCompleted);

      if (this.state.checkedStatus) {
        this.setState({
          checkedStatus: !this.state.checkedStatus
        });
      }
      else if (checkedNewStatus && !isCompleted) {
        this.setState({
          checkedStatus: !this.state.checkedStatus
        });
      }
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
        todoItems: [
          { title: value, isCompleted: false },
          ...this.state.todoItems
        ],
        checkedStatus: false
      })
    }
  }

  onChange(even) {
    this.setState({
      value: even.target.value
    })
  }

  clearItems() {
    const { todoItems } = this.state;
    let clearedList = todoItems.filter(item => item.isCompleted === false);
    this.setState({
      todoItems: clearedList
    });

    this.setState({
      checkedStatus: false
    })

  }

  render() {
    const { todoItems, value, checkedStatus } = this.state;
    let url;
    if (checkedStatus) url = checked;
    else url = checkall;
    return (
      <div className="App">
        <h1>Your Todo List</h1>
        <div className="box">
          <div className="box-header">
            <img src={url} width={32} height={32} alt="" onClick={this.checkAll} />
            <input className="input" type="text" onKeyUp={this.onKeyUp} placeholder="Add a new item" value={value} onChange={this.onChange} />
          </div>
          {
            todoItems.length > 0 && todoItems.map((item, index) => <TodoItem key={index} item={item} onClicked={this.onItemClick(item)} />)
          }
          {
            todoItems.length === 0 && <h2>No item in this list</h2>
          }
          <div className="box-footer">
            <span onClick={this.clearItems}>Clear completed</span>
            <span onClick={this.filterCompleted}>Completed</span>
            <span onClick={this.filterUncompleted}>Uncompleted items</span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
