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
            cardList.listItems.map((listItem, index) => (
                <div key={`${listItem.task}-group`} className='d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        onClick={() => this.handleCheck(cardList.id, index)}
                        style={{whiteSpace: 'normal'}}
                    />
                    <ContentEditable
                        innerRef={this.contentEditable}
                        html={listItem.task}
                        onChange={(e) => this.updateList(e, 'listItem', index)}
                        tagName='p'
                    />
                </div>)
            )
        )
    }

}

export default Card;