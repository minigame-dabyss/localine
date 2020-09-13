FROM golang:1.14.0-alpine3.11

ENV GO111MODULE=on

WORKDIR /go/src/localine

RUN apk add --no-cache --update git

RUN GO111MODULE=off go get github.com/pilu/fresh
