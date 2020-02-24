import { ReactiveSocket, Encodable } from 'rsocket-types'
import RSocketWebSocketClient from 'rsocket-websocket-client'
import { RSocketClient, JsonSerializer, IdentitySerializer } from 'rsocket-core'
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throws } from 'assert';

@Injectable()
export class SocketUIService {

  constructor(private http: HttpClient) {}

  client = new RSocketClient({
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
  
  socketPromise: Promise<ReactiveSocket<any, Encodable>> = new Promise(
    (resolve, reject) => {
    this.client.connect().subscribe({
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

  async getSocketResponse(socketRequest: any): Promise<any> {
    const socket = await this.socketPromise
    return socket.requestStream({ metadata: String.fromCharCode('working.time.abc-1234.2020-01-31T23:59:59.2020-01-31T23:59:59'.length) + 'working.time.abc-1234.2020-01-31T23:59:59.2020-01-31T23:59:59' })
  }

}
