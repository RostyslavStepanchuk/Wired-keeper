import React, {Component} from 'react';
import {WiredCard} from 'wired-elements';

class CardList extends Component {
    render() {
        return (
            <wired-card>
                <h1>{this.props.title}</h1>
                <ul>
                    {this.props.listItems.map((listItem, index)=> <li
                        key={index}
                        style={listItem.completed ? {color: 'grey'} : {color:'black'}}
                    >
                        {listItem.task}
                    </li>)}
                </ul>
            </wired-card>
        );
    }
}

export default CardList;