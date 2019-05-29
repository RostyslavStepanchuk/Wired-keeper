import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable'
import Textarea from 'react-textarea-autosize'

import './card.scss'

class Card extends Component {
    renderTitle(title) {
        return (
            <ContentEditable
                className='body__card-title'
                innerRef={this.contentEditable}
                html={title}
                tagName='h1'
                onChange={this.handleTitleChange}
            />
        )
    }

    renderParagraph(text) {
        return (
            <ContentEditable
                innerRef={this.contentEditable}
                html={text}
                id='scrollbar'
                style={{overflowY: 'scroll', minHeight:'90px', maxHeight: '120px'}}
                tagName='p'
                onChange={this.handleTextChange}

            />
        )
    }

    renderListItems(listItems) {
        return (
            listItems.map((listItem, index) => (
                <div key={`${listItem.key}`} className='d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        style={{whiteSpace: 'normal'}}
                        onClick={(e) => this.handleCheckboxTick(e, index)}
                    />
                    <Textarea
                        className = 'body__card_list-item-text'
                        value={listItem.task}
                        onChange={(e) => this.handleTaskDescriptionChange(e, index)}
                    />
                </div>)
            )
        )
    }

}

export default Card;