import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({
        email: 'eberlawrence@hotmail.com',
        password: '654321',
        techs: [
            'ReactJS',
            'React Native',
            {
                title: 'Python',
                experience: 23
            }
        ]
    })
    
    
    return response.json({message: 'Hello'});
};