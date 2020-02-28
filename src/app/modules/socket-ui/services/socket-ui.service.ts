import { SocketRequest } from './../models/socker-request.model'
import { ReactiveSocket, Encodable } from 'rsocket-types'
import RSocketWebSocketClient from 'rsocket-websocket-client'
import { RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core'
import { Injectable } from "@angular/core";
import { Flowable } from 'rsocket-flowable';

@Injectable()
export class SocketUIService {

  constructor() {}

  async getSocketResponse(socketRequest: SocketRequest): Promise<any> {
    const socket = await this.getSocketBase(socketRequest.wsBaseUrl)
    console.log(socketRequest.interactionModel)
    switch(socketRequest.interactionModel) {
      case 'Request-Response' :
        return socket.requestResponse({
          data: socketRequest.payload,
          metadata: String.fromCharCode(`${socketRequest.destinationUrl}`.length) + `${socketRequest.destinationUrl}`
        })
      case 'Request-Stream' :
        return socket.requestStream({
          data: socketRequest.payload,
          metadata: String.fromCharCode(`${socketRequest.destinationUrl}`.length) + `${socketRequest.destinationUrl}`
        })
      case 'Channel' :
        return socket.requestChannel(new Flowable(socketRequest.payload))
      case 'Fire-and-Forget':
        return socket.fireAndForget({
          data: socketRequest.payload,
          metadata: String.fromCharCode(`${socketRequest.destinationUrl}`.length) + `${socketRequest.destinationUrl}`
        })
      default :
        throw new Error('No interaction model provided!')
    }
  }

  async getSocketBase(wsUrl: string): Promise<ReactiveSocket<any, Encodable>> {
    const client = new RSocketClient({
      serializers: {
        data: JsonSerializer,
        metadata: IdentitySerializer
      },
      setup: {
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'message/x.rsocket.routing.v0'
      },
      transport: new RSocketWebSocketClient({
        url: 'ws://localhost/rsocket'
      })
    })
    
    const socketPromise: Promise<ReactiveSocket<any, Encodable>> = new Promise(
      (resolve, reject) => {
      client.connect().subscribe({
          onComplete: socket => {
            resolve(socket)
          },
          onError: error => {
            console.log('error', error)
          },
          onSubscribe: cancel => {}
        })
      }
    )

    return socketPromise
  }

}
