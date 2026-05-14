import http from 'node:http';
import Database from 'better-sqlite3';

const PORT = 3000;

const db = new Database('./facts.db', { readonly: true});

const server = http.createServer((request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET');

    if (request.url === '/fatos') {
        const query = db.prepare('SELECT * FROM facts;');
        const facts = query.all();

        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(facts));
        return;
    };

    response.writeHead(404, { 'content-type': 'aplication/json'});
    response.end(JSON.stringify({erro: 'Página não encontrada.'}))
}); 

server.listen(PORT);