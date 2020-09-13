package main

import (
	"context"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	pb "localine/server/proto"
	"log"
	"net"
	"time"
)

const (
	port = ":9090"
)

type server struct {
	pb.UnimplementedMessengerServer
	requests []*pb.CreateMessageRequest
}

func (s *server) GetMessages(req *pb.GetMessagesRequest, stream pb.Messenger_GetMessagesServer) (error) {
	for _, r := range s.requests {
		if err := stream.Send(&pb.GetMessagesResponse{Message: r.GetMessage()}); err != nil {
			return err
		}
	}

	previousCount := len(s.requests)

	for {
		currentCount := len(s.requests)
		if previousCount < currentCount {
			r := s.requests[currentCount-1]
			log.Printf("Sent: %v", r.GetMessage())
			if err := stream.Send(&pb.GetMessagesResponse{Message: r.GetMessage()}); err != nil {
				return err
			}
		}
		previousCount = currentCount
	}
}

func (s *server) CreateMessage(ctx context.Context,req *pb.CreateMessageRequest) (*pb.CreateMessageResponse,error){
	log.Printf("Received: %v", req.GetMessage())
	newR := &pb.CreateMessageRequest{Message: req.GetMessage() + ": " + time.Now().Format("2006-01-02 15:04:05")}
	s.requests = append(s.requests, newR)
	return &pb.CreateMessageResponse{Message: req.GetMessage()}, nil
}

func main(){
	lis,err := net.Listen("tcp",port)
	if err!=nil{
		log.Fatalf("failed to listen: %v",err)
	}
	s:= grpc.NewServer()
	pb.RegisterMessengerServer(s,&server{})
	reflection.Register(s)
	if err := s.Serve(lis);err!=nil{
		log.Fatalf("failed to serve: %v",err)
	}
}
