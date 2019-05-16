import React from 'react';

const NotationCatalog = ({notationTypes, handleType}) => {
    const test = () => console.log('test');
    return (
        <wired-listbox
            onClick={() => test()}
            horizontal
            selected="All">
            {notationTypes.map(type => (
                <wired-item
                    key={type}
                    value={type}
                >{type}
                </wired-item>
            ))}
        </wired-listbox>
    );
};


export default NotationCatalog;