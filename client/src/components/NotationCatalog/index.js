import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTable } from '@fortawesome/free-solid-svg-icons'
import {faCheckSquare} from '@fortawesome/free-regular-svg-icons'

const NotationCatalog = ({notationTypes, handleType}) => {
    const icons = {
        notes: <FontAwesomeIcon style={{color:'#243E36'}} icon={faPencilAlt} />,
        lists: <FontAwesomeIcon style={{color:'#243E36'}} icon={faCheckSquare} />,
        note: <FontAwesomeIcon style={{color:'#243E36'}} icon={faTable} />,

    };
    return (
            <div className="col-12 text-center mb-4">
            {notationTypes.map(type => (
                <wired-icon-button
                    style={{marginLeft: '20px', height: '55px', width: '55px', fontSize: '10px'}}
                    onClick={()=> handleType(type)}
                    key={type}
                >
                    {icons[type]}
                </wired-icon-button>
            ))}
            </div>
    );
};


export default NotationCatalog;