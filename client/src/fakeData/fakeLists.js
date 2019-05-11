const lists = [
    {
        title: 'React',
        listItems: [{
            completed: true,
            task: 'be react ninja asap'
        },
            {
                completed: true,
                task: 'finish the course'
            },
            {
                completed: false,
                task: 'find a job'
            }
        ]
    },
    {
        title: 'Javascript',
        listItems: [{
            completed: false,
            task: 'finish the book'
        },{
            completed: true,
            task: 'write a variable'
        }
        ]
    },
    {
        title: 'Styles',
        listItems: [{
            completed: false,
            task: 'learn better SASS, SCSS and other shit'
        }]
    }
];

export function getLists(){
    return lists;
}
