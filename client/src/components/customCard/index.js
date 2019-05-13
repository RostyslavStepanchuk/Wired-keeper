// import React, {Component} from 'react';
// // import {WiredCard, WiredCheckbox} from 'wired-elements';
// import Button from '../Button'
// import ContentEditable from 'react-contenteditable'
//
//
// class CustomCard extends Component {
//     state = {
//         data: {
//             title: '',
//             listItems: []
//         }
//     };
//
//     handleSave = (card) => {
//         // set state with new data after clicking
//         console.log(card)
//     };
//     handleChange = (e) => {
//         console.log('blabla')
//         console.log(e.target.value);
//     };
//
//     render() {
//         return (
//             <wired-card>
//                 <ContentEditable
//                     innerRef={this.contentEditable}
//                     html={this.props.cardTitle} // innerHTML of the editable div
//                     onChange={()=>this.props.onChange} // handle innerHTML change
//                     tagName='h1' // Use a custom HTML tag (uses a div by default)
//                 />
//                 <ContentEditable
//                     innerRef={this.contentEditable}
//                     html={this.props.onChange} // innerHTML of the editable div
//                     onChange={this.handleChange} // handle innerHTML change
//                     tagName='p' // Use a custom HTML tag (uses a div by default)
//                 />
//                 <Button title='sumbmitter'
//                         onClick={() => this.changes()}
//                 />
//             </wired-card>
//         );
//     }
// }
//
// export default CustomCard;