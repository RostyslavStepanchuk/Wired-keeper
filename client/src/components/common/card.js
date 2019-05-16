import React, {Component} from 'react';
import ContentEditable from 'react-contenteditable'

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
                tagName='p'
                onChange={this.handleTextChange}

            />
        )
    }

    renderListItems(listItems) {
        return (
            listItems.map((listItem, index) => (
                <div key={`${listItem.task}-group`} className='d-flex'>
                    <wired-checkbox
                        checked={listItem.checked ? 'checked' : null}
                        style={{whiteSpace: 'normal'}}
                        onClick={(e)=>this.handleCheckboxTick(e,index)}
                    />
                    <ContentEditable
                        innerRef={this.contentEditable}
                        html={listItem.task}
                        tagName='p'
                        onChange={(e)=>this.handleTaskDescriptionChange(e,index)}
                    />
                </div>)
            )
        )
    }

}

export default Card;