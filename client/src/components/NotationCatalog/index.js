import React from 'react';

const NotationCatalog = ({notationTypes, handleType}) => {
    return (
            <div className="col-12 text-center my-4">
            {notationTypes.map(type => (
                <wired-icon-button
                    style={{'--wired-icon-size' : '35px', 'marginLeft': '20px'}}
                    onClick={()=> handleType(type)}
                    key={type}
                >
                    {type}
                </wired-icon-button>
            ))}
            </div>
    );
};


export default NotationCatalog;