import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import * as WebSocket from 'ws'
import { Server } from "http";
import { Injectable } from "@nestjs/common";
@Injectable()
export class EventsGateway {
    constructor(
    ) { }
    @WebSocketServer() server: Server;
    @SubscribeMessage('PULL_MESSAGE')
    action(@MessageBody() data: any, @ConnectedSocket() client: WebSocket) {
        client.send(JSON.stringify({ event: 'SEND_SUCCESS' }))
    }

    @SubscribeMessage('')
    async Oaction(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): Promise<any> {
        console.log(data, '++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')

    }
}
