import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable'

class Card extends Component {


    renderTitle(title) {
        return (
            <ContentEditable
                innerRef={this.contentEditable}
                html={title}
                onChange={(e) => this.updateNote(e, 'heading')}
                tagName='h1'
            />
        )
    }

    renderParagraph(text) {
        return (
            <ContentEditable
                innerRef={this.contentEditable}
                html={text}
                onChange={(e) => this.updateNote(e, 'noteText')}
                tagName='p'
            />
        )
    }

    renderListItems(cardList) {
        return (
            cardList.listItems.map((listItem, index) => (<div className='d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        key={index}
                        onClick={() => this.handleCheck(cardList, index)}
                        style={{whiteSpace: 'normal'}}
                    />
                    <ContentEditable
                        innerRef={this.contentEditable}
                        html={listItem.task}
                        key={listItem.task}
                        onChange={(e) => this.updateList(e, 'listItem', index)}
                        tagName='p'
                    />
                </div>)
            )
        )
    }

}

export default Card;