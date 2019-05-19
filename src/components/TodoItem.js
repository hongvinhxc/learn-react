import React, { Component } from 'react';
import classNames from "classnames";
import './TodoItem.css'
class TodoItem extends Component {
    render() {
        const {item, onClicked} = this.props;
        return (
            <div className={classNames('TodoItem',{
                'TodoItem-Complete': item.isCompleted
            })} onClick={onClicked}>
                <p>{item.title}</p>
            </div>
        );
    }
}

export default TodoItem;