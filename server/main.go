package main

import (
	"context"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	pb "localine/server/proto"
	"log"
	"net"
)

const (
	port     = ":9090"
	location = "Asia/Tokyo"
)

type server struct {
	pb.UnimplementedMessengerServer
	messages []*pb.CreateMessageResponse
}

func (s *server) GetMessages(req *pb.GetMessagesRequest, stream pb.Messenger_GetMessagesServer) error {
	for _, r := range s.messages {
		if err := stream.Send(&pb.GetMessagesResponse{
			Type: r.GetType(),Timestamp: r.GetTimestamp(),Source: r.GetSource(),Event: r.GetEvent(),ReplyToken: r.GetReplyToken()}); err != nil {
			return err
		}
	}

	previousCount := len(s.messages)

	for {
		currentCount := len(s.messages)
		if previousCount < currentCount {
			r := s.messages[currentCount-1]
			log.Printf("Sent: %v", r.GetEvent().String())
			if err := stream.Send(&pb.GetMessagesResponse{
				Type: r.GetType(),Timestamp: r.GetTimestamp(),Source: r.GetSource(),Event: r.GetEvent(),ReplyToken: r.GetReplyToken()}); err != nil {
				return err
			}
		}
		previousCount = currentCount
	}
}

func (s *server) CreateMessage(ctx context.Context, req *pb.CreateMessageRequest) (*pb.CreateMessageResponse, error) {
	res := &pb.CreateMessageResponse{
		Type: req.GetType(),
		Timestamp: req.GetTimestamp(),
		Source: req.GetSource(),
		Event: req.GetEvent(),
	}
	resJson,err := json.Marshal(res)
	if err!=nil{
		return nil,err
	}
	replyToken := md5.Sum(resJson)
	res.ReplyToken = hex.EncodeToString(replyToken[:])
	log.Printf("Received: %+v", res)

	s.messages = append(s.messages, res)
	return res, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterMessengerServer(s, &server{})
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
