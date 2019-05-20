import React, { Component } from 'react';
import classNames from "classnames";
import unchecked from '../img/checkbox.svg';
import checked from '../img/completed.svg';
import './TodoItem.css'
class TodoItem extends Component {
    render() {
        const { item, onClicked } = this.props;
        let url = unchecked;
        if (item.isCompleted) url=checked;
        return (
            <div className="box-item"> 
                <img src={url} width={32} height={32} onClick={onClicked} alt=''/>
                <div className={classNames('opacity-50 TodoItem', {
                    'TodoItem-Complete': item.isCompleted
                })} >
                    <p>{item.title}</p>
                </div>
            </div>
        );
    }
}

export default TodoItem;