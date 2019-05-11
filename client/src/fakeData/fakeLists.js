const lists = [
    {
        _id: 1,
        title: 'React',
        type: 'list',
        listItems: [{
            checked: true,
            task: 'be react ninja asap'
        },
            {
                checked: true,
                task: 'finish the course'
            },
            {
                checked: false,
                task: 'find a job'
            }
        ]
    },
    {
        _id: 2,
        title: 'Javascript',
        type: 'list',
        listItems: [{
            checked: false,
            task: 'finish the book'
        },{
            checked: true,
            task: 'write a variable'
        }
        ]
    },
    {
        _id: 3,
        title: 'Styles',
        type: 'list',
        listItems: [{
            checked: false,
            task: 'learn better SASS, SCSS and other shit'
        }]
    }
];

export function getLists(){
    return lists;
}
