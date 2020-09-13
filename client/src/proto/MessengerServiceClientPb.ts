/**
 * @fileoverview gRPC-Web generated client stub for messenger
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  CreateMessageRequest,
  CreateMessageResponse,
  GetMessagesRequest,
  GetMessagesResponse} from './messenger_pb';

export class MessengerClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetMessages = new grpcWeb.AbstractClientBase.MethodInfo(
    GetMessagesResponse,
    (request: GetMessagesRequest) => {
      return request.serializeBinary();
    },
    GetMessagesResponse.deserializeBinary
  );

  getMessages(
    request: GetMessagesRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/messenger.Messenger/GetMessages',
      request,
      metadata || {},
      this.methodInfoGetMessages);
  }

  methodInfoCreateMessage = new grpcWeb.AbstractClientBase.MethodInfo(
    CreateMessageResponse,
    (request: CreateMessageRequest) => {
      return request.serializeBinary();
    },
    CreateMessageResponse.deserializeBinary
  );

  createMessage(
    request: CreateMessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CreateMessageResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/messenger.Messenger/CreateMessage',
      request,
      metadata || {},
      this.methodInfoCreateMessage,
      callback);
  }

}

