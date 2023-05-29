import express, { request, response } from 'express';

const app = express();

app.get('/', (request, response) =>{
    const jsonResponse = { message: 'Hello,World'}
    console.log(`response: ${JSON.stringify(jsonResponse)}`)
    return response.json(jsonResponse);
})

app.listen(3333, () => {
    console.log('Server Started on port 3333!!!')
});