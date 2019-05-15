import React from 'react';

const NotationCatalog = ({notationTypes, handleType}) => {
    const test = () => console.log('test');
    return (
        <wired-listbox
            onClick={() => test()}
            horizontal
            selected="">
            {notationTypes.map(type => (
                <wired-item
                    value={type}
                >{type}
                </wired-item>
            ))}
        </wired-listbox>
    );
};


export default NotationCatalog;