import { v4 as uuid } from 'uuid';

const defaultFormData = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'johnsmith@gmail.com',
    phone: '(978) 145-5563',
    skills: [
        { value: 'Critical Thinking', id: uuid() },
        { value: 'Javascript', id: uuid() },
        { value: 'HTML', id: uuid() },
        { value: 'CSS', id: uuid() },
    ],

    education: [
        {
            school: 'University of New England',
            degree: 'Bachelor of Computer Science',
            startYear: '2012',
            endYear: '2016',
            id: uuid(),
        },
        {
            school: 'Gargoule High',
            degree: 'High School Diploma',
            startYear: '2008',
            endYear: '2012',
            id: uuid(),
        }
    ],
    workHistory: [
        {
            position: 'Web Developer',
            employer: 'Milestone Inc.',
            address: '173 Kraken St',
            phone: '(978) 122 3887',
            city: 'Boston',
            state: 'MA',
            startYear: '2016',
            endYear: '2024',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem consequuntur libero, mollitia eos architecto alias, temporibus corporis laborum soluta culpa asperiores optio voluptates earum quae voluptatem iusto laboriosam ipsa.`,
            id: uuid(),
        },        {
            position: 'Wizard',
            employer:"Potter's Lot O' Pots",
            address: '1123 Magic Ln',
            phone: '(978) 342 6631',
            city: 'Gnewton',
            state: 'MA',
            startYear: '1942',
            endYear: '2003',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolorem consequuntur libero, mollitia eos architecto alias, temporibus corporis laborum soluta culpa asperiores optio voluptates earum quae voluptatem iusto laboriosam ipsa.`,
            id: uuid(),
        },
    ],
}

export default defaultFormData;