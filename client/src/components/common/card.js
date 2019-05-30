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
                className='body__card_note-text'
                innerRef={this.contentEditable}
                html={text}
                id='scrollbar'
                style={{overflowY: 'scroll', minHeight: '90px', maxHeight: '120px'}}
                tagName='p'
                onChange={this.handleTextChange}
            />
        )
    }

    renderListItems(listItems) {
        return (
            listItems.map((listItem, index) => (
                <div key={`${listItem.key}`} className='body__card_list-row d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        style={{whiteSpace: 'normal'}}
                        onClick={(e) => this.handleCheckboxTick(e, index)}
                    />
                    <Textarea
                        className='body__card_list-item-text'
                        value={listItem.task}
                        onChange={(e) => this.handleTaskDescriptionChange(e, index)}
                        onFocus={() => this.setFocusOnItem(listItem.key)}
                        // onBlur={this.removeFocusFromItem}
                        inputRef={tag => (this[listItem.key] = tag)}
                    />
                    {listItem.key === this.state.focusedItem && <wired-icon-button
                        className="body__card_add-item-btn"
                        style={{
                            '--wired-icon-size': '15px',
                            transform: 'translate(0,-5px)',
                            height: '25px',
                            width: '25px'
                        }}
                        onMouseUp={(e) => this.addNewItem(e, index, this.props.cardList.id)}
                    >add</wired-icon-button>}
                    {listItem.key === this.state.focusedItem && <wired-icon-button
                        className="body__card_add-item-btn"
                        style={{
                            '--wired-icon-size': '15px',
                            transform: 'translate(0,-5px)',
                            height: '25px',
                            width: '25px'
                        }}
                        onMouseUp={(e) => this.deleteThisItem(e, index, this.props.cardList.id)}
                    >delete</wired-icon-button>}
                </div>)
            )
        )
    }

}

export default Card;