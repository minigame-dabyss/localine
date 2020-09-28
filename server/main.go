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
	port     = ":9090"
	location = "Asia/Tokyo"
)

type server struct {
	pb.UnimplementedMessengerServer
	requests []*pb.CreateMessageRequest
}

func (s *server) GetMessages(req *pb.GetMessagesRequest, stream pb.Messenger_GetMessagesServer) error {
	for _, r := range s.requests {
		if err := stream.Send(&pb.GetMessagesResponse{UserName:r.GetUserName(),Message: r.GetMessage()}); err != nil {
			return err
		}
	}

	previousCount := len(s.requests)

	for {
		currentCount := len(s.requests)
		if previousCount < currentCount {
			r := s.requests[currentCount-1]
			log.Printf("Sent: %v", r.GetMessage())
			if err := stream.Send(&pb.GetMessagesResponse{UserName:r.GetUserName(),Message: r.GetMessage()}); err != nil {
				return err
			}
		}
		previousCount = currentCount
	}
}

func (s *server) CreateMessage(ctx context.Context, req *pb.CreateMessageRequest) (*pb.CreateMessageResponse, error) {
	log.Printf("Received: %v", req.GetMessage())
	loc, err := time.LoadLocation(location)
	if err != nil {
		loc = time.FixedZone(location, 9*60*60)
	}
	newR := &pb.CreateMessageRequest{UserName:req.GetUserName(),Message: req.GetMessage() + ": " + time.Now().In(loc).Format("2006-01-02 15:04:05")}
	s.requests = append(s.requests, newR)
	return &pb.CreateMessageResponse{UserName:req.GetUserName(),Message: req.GetMessage()}, nil
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
