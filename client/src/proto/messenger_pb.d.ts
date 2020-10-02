import * as jspb from "google-protobuf"

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';

export class GetMessagesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessagesRequest): GetMessagesRequest.AsObject;
  static serializeBinaryToWriter(message: GetMessagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessagesRequest;
  static deserializeBinaryFromReader(message: GetMessagesRequest, reader: jspb.BinaryReader): GetMessagesRequest;
}

export namespace GetMessagesRequest {
  export type AsObject = {
  }
}

export class GetMessagesResponse extends jspb.Message {
  getReplytoken(): string;
  setReplytoken(value: string): void;

  getType(): EventType;
  setType(value: EventType): void;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasTimestamp(): boolean;
  clearTimestamp(): void;

  getSource(): Source | undefined;
  setSource(value?: Source): void;
  hasSource(): boolean;
  clearSource(): void;

  getEvent(): Event | undefined;
  setEvent(value?: Event): void;
  hasEvent(): boolean;
  clearEvent(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMessagesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMessagesResponse): GetMessagesResponse.AsObject;
  static serializeBinaryToWriter(message: GetMessagesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMessagesResponse;
  static deserializeBinaryFromReader(message: GetMessagesResponse, reader: jspb.BinaryReader): GetMessagesResponse;
}

export namespace GetMessagesResponse {
  export type AsObject = {
    replytoken: string,
    type: EventType,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    source?: Source.AsObject,
    event?: Event.AsObject,
  }
}

export class CreateMessageRequest extends jspb.Message {
  getType(): EventType;
  setType(value: EventType): void;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasTimestamp(): boolean;
  clearTimestamp(): void;

  getSource(): Source | undefined;
  setSource(value?: Source): void;
  hasSource(): boolean;
  clearSource(): void;

  getEvent(): Event | undefined;
  setEvent(value?: Event): void;
  hasEvent(): boolean;
  clearEvent(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMessageRequest): CreateMessageRequest.AsObject;
  static serializeBinaryToWriter(message: CreateMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMessageRequest;
  static deserializeBinaryFromReader(message: CreateMessageRequest, reader: jspb.BinaryReader): CreateMessageRequest;
}

export namespace CreateMessageRequest {
  export type AsObject = {
    type: EventType,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    source?: Source.AsObject,
    event?: Event.AsObject,
  }
}

export class Source extends jspb.Message {
  getType(): SourceType;
  setType(value: SourceType): void;

  getUserid(): string;
  setUserid(value: string): void;

  getUsername(): string;
  setUsername(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Source.AsObject;
  static toObject(includeInstance: boolean, msg: Source): Source.AsObject;
  static serializeBinaryToWriter(message: Source, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Source;
  static deserializeBinaryFromReader(message: Source, reader: jspb.BinaryReader): Source;
}

export namespace Source {
  export type AsObject = {
    type: SourceType,
    userid: string,
    username: string,
  }
}

export class Event extends jspb.Message {
  getMessage(): MessageEvent | undefined;
  setMessage(value?: MessageEvent): void;
  hasMessage(): boolean;
  clearMessage(): void;

  getPostback(): PostbackEvent | undefined;
  setPostback(value?: PostbackEvent): void;
  hasPostback(): boolean;
  clearPostback(): void;

  getEventCase(): Event.EventCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Event.AsObject;
  static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
  static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Event;
  static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
  export type AsObject = {
    message?: MessageEvent.AsObject,
    postback?: PostbackEvent.AsObject,
  }

  export enum EventCase { 
    EVENT_NOT_SET = 0,
    MESSAGE = 1,
    POSTBACK = 2,
  }
}

export class MessageEvent extends jspb.Message {
  getType(): MessageType;
  setType(value: MessageType): void;

  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageEvent): MessageEvent.AsObject;
  static serializeBinaryToWriter(message: MessageEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageEvent;
  static deserializeBinaryFromReader(message: MessageEvent, reader: jspb.BinaryReader): MessageEvent;
}

export namespace MessageEvent {
  export type AsObject = {
    type: MessageType,
    text: string,
  }
}

export class PostbackEvent extends jspb.Message {
  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostbackEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PostbackEvent): PostbackEvent.AsObject;
  static serializeBinaryToWriter(message: PostbackEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostbackEvent;
  static deserializeBinaryFromReader(message: PostbackEvent, reader: jspb.BinaryReader): PostbackEvent;
}

export namespace PostbackEvent {
  export type AsObject = {
    data: string,
  }
}

export class CreateMessageResponse extends jspb.Message {
  getReplytoken(): string;
  setReplytoken(value: string): void;

  getType(): EventType;
  setType(value: EventType): void;

  getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): void;
  hasTimestamp(): boolean;
  clearTimestamp(): void;

  getSource(): Source | undefined;
  setSource(value?: Source): void;
  hasSource(): boolean;
  clearSource(): void;

  getEvent(): Event | undefined;
  setEvent(value?: Event): void;
  hasEvent(): boolean;
  clearEvent(): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateMessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateMessageResponse): CreateMessageResponse.AsObject;
  static serializeBinaryToWriter(message: CreateMessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateMessageResponse;
  static deserializeBinaryFromReader(message: CreateMessageResponse, reader: jspb.BinaryReader): CreateMessageResponse;
}

export namespace CreateMessageResponse {
  export type AsObject = {
    replytoken: string,
    type: EventType,
    timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    source?: Source.AsObject,
    event?: Event.AsObject,
  }
}

export enum EventType { 
  MESSAGE = 0,
  POSTBACK = 1,
}
export enum SourceType { 
  USER = 0,
  GROUP = 1,
}
export enum MessageType { 
  TEXT = 0,
}
