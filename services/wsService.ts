import { WebSocket } from 'ws';
import { putChat, getChat } from '../src/class/controllers/class.cont';

const server = new WebSocket.Server({ port: 8080 });
const clients: Set<WebSocket> = new Set();

export default function wss() {
    server.on('connection', (ws: WebSocket) => {
        clients.add(ws);
        console.log('Client connected');

        ws.on('message', async (msg: string) => {
            try {
                const message = JSON.parse(Buffer.from(msg).toString('utf-8'));
                await putChat(message);
                ws.send(JSON.stringify(await getChat(message.classID)))

            } catch (error) {
                ws.send(JSON.stringify({ status: 'error', message: 'Failed to process message.' }));
            }
        });

        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client disconnected');
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    console.log("WebSocket service active");
}