---
layout: post
title: "gRPC Concepts and Implementation (Go & Python) - Building High-Performance Microservices"
date: 2026-01-25 23:30:00 +0800
description: "From environment setup to practical development, implementing gRPC's four communication patterns step-by-step using Go and Python: Unary, Server Streaming, Client Streaming, and Bidirectional Streaming."
tags: [gRPC, Golang, Python, Backend]
categories: [Backend Development]
toc:
  sidebar: right
thumbnail: /assets/img/grpc_introduction.png
---

> You can download the complete code for this article at [grpc-demo repo](https://github.com/nickhuangcyh/grpc-demo).

## What is gRPC?

Before we start coding, let's understand what **gRPC** is intuitively and why it's so popular in microservices architecture.

Simply put, gRPC is a **Remote Procedure Call** system developed by Google. Don't be intimidated by the technical term; let's use a real-life example:

- **Local Function Call**:
  It's like chopping vegetables in your own kitchen. Your brain commands "chop onion", and your hand does it immediately. It's the fastest way with no latency.

- **REST API (Traditional HTTP/JSON)**:
  It's like writing a detailed note (JSON), putting it in an envelope (HTTP), and mailing it to a friend in another building asking them to chop an onion. They receive it, open the envelope, read the note, chop the onion, and write a note back to you. This is flexible, but the process of "enveloping", "sending", and "parsing" is slower.

- **gRPC**:
  It's like setting up a **dedicated phone line** with your friend and agreeing on a set of **code words** (Protocol Buffers). You just say "Code 01, Onion", and they execute it directly without opening envelopes or translating.

### Core Advantages of gRPC

1.  **Extreme Performance**: Uses **HTTP/2** transport (supporting bidirectional streaming, multiplexing) and **Binary** data format, which is much lighter than JSON.
2.  **Strict Contract**: Interfaces are defined via `.proto` files. Server and Client must strictly adhere to them, avoiding errors like "expected a number but got a string".
3.  **Multi-language Support**: The Server can be written in Go, and the Client in Python, Java, or Node.js, integrating seamlessly.

This article will take you from scratch, setting up the environment, and using **Go (Server)** and **Python (Client)** to implement the four core communication patterns of gRPC **step-by-step**.

---

## 1. Prerequisites

Before we start coding, we need to install compilers and language-specific plugins.

### Install Protocol Buffers Compiler (protoc)

This is the core tool of gRPC, used to compile `.proto` files into code for various languages.

- **macOS**:
  ```bash
  brew install protobuf
  ```
- **Windows**:
  Recommended using Chocolatey:
  ```bash
  choco install protoc
  ```

### Install Go Plugins

We need to install Go's code generation tools. Please execute in the terminal:

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

**⚠️ Important Setting:**
After installation, these tools will be placed under `$GOPATH/bin`. Please ensure your system `PATH` includes this path.

```bash
# Mac/Linux (add to .zshrc or .bashrc)
export PATH="$PATH:$(go env GOPATH)/bin"

# Windows (PowerShell)
# Please manually add C:\Users\YourName\go\bin to Path in "Edit the system environment variables"
```

### Install Python Packages

We will use Python for the Client side to verify cross-language capabilities:

```bash
pip install grpcio grpcio-tools
```

---

## 2. Project Structure and Initialization

To keep the Proto files neatly shared between Go and Python, we adopt the following structure:

```text
grpc-demo/
├── go.mod
├── proto/              (Core area: stores .proto and generated code)
│   ├── greeter.proto
│   ├── ... (Go files)
│   ├── greeter_pb2.py
│   └── greeter_pb2_grpc.py
├── server/
│   └── main.go         (Go Server)
└── client/
    ├── main.go         (Go Client)
    └── python_client.py (Python Client)
```

Initialize the project:

```bash
mkdir grpc-demo
cd grpc-demo
go mod init grpc-demo
```

---

## 3. Defining the Contract and Generating Code

In gRPC, everything starts with a contract. Let's first create `proto/greeter.proto`. For the sake of this tutorial, we will define all four patterns at once and implement the logic one by one later.

**proto/greeter.proto**

```protobuf
syntax = "proto3";

option go_package = "./proto";

package greeter;

// Define Service
service Greeter {
  // 1. Unary
  rpc SayHello (HelloRequest) returns (HelloReply) {}

  // 2. Server Streaming (return value has stream)
  rpc GetStockPrice (StockRequest) returns (stream StockReply) {}

  // 3. Client Streaming (argument has stream)
  rpc RecordMetrics (stream Metric) returns (MetricSummary) {}

  // 4. Bidirectional Streaming (both sides have stream)
  rpc Chat (stream ChatMessage) returns (stream ChatMessage) {}
}

// ---
Message Definitions ---

// Unary
message HelloRequest { string name = 1; }
message HelloReply { string message = 1; }

// Server Streaming
message StockRequest { string symbol = 1; }
message StockReply { string symbol = 1; double price = 2; }

// Client Streaming
message Metric { double value = 1; }
message MetricSummary { int32 count = 1; double average = 2; }

// Bidirectional Streaming
message ChatMessage { string user = 1; string message = 2; }
```

### Generating Code

This is the most critical step. We need to generate code for Go and Python respectively.

**Generate Go Code:**

```bash
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/greeter.proto
```

**Generate Python Code:**
To avoid Python import path errors, we use `-I=proto` to make the generated code based on the proto folder:

```bash
python -m grpc_tools.protoc -I=proto --python_out=proto --grpc_python_out=proto proto/greeter.proto
```

---

## 4. Hands-on Practice: Implementing Four Patterns Step-by-Step

Next, we will complete the Server and Client implementation in order according to the four gRPC patterns.

### Basic Setup: Server Framework

First, establish the basic gRPC Server architecture in `server/main.go`.

```go
package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"math/rand"
	"net"
	"time"

	"google.golang.org/grpc"
	pb "grpc-demo/proto" // Please confirm this path matches go.mod
)

type server struct {
	pb.UnimplementedGreeterServer
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("gRPC Server started at :50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
```

### Basic Setup: Client Framework

We prepare two files for the Client part.

**Go Client (`client/main.go`)**

```go
package main

import (
	"context"
	"io"
	"log"
	"time"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	pb "grpc-demo/proto"
)

func main() {
	conn, _ := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

    // ... Subsequent implementation will be placed here ...
}
```

**Python Client (`client/python_client.py`)**

```python
import sys
import os
import grpc
import time

# [Critical] Set path to find the proto folder
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
sys.path.append(os.path.join(project_root, 'proto'))

import greeter_pb2
import greeter_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = greeter_pb2_grpc.GreeterStub(channel)
        # ... Subsequent implementation will be placed here ...

if __name__ == '__main__':
    run()
```

---

### Level 1: Unary (Single Call)

This is the most traditional mode, similar to HTTP Request/Response. Client asks once, Server answers once.

**1. Server Implementation (`server/main.go`)**
Add the `SayHello` method to the `server` struct:

```go
func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{Message: "Hello " + req.GetName()}, nil
}
```

**2. Client Call**

**Go:**

```go
// 1. Unary
log.Println("--- 1. Unary ---")
r, _ := c.SayHello(context.Background(), &pb.HelloRequest{Name: "Go Client"})
log.Printf("Response: %s", r.GetMessage())
```

**Python:**

```python
print("\n[Unary]")
res = stub.SayHello(greeter_pb2.HelloRequest(name="Python"))
print(f"Response: {res.message}")
```

---

### Level 2: Server Streaming

**Scenario:** Stock quotes, live subtitles.
The Client sends a request, and the Server returns data multiple times via `stream.Send()` until finished.

**1. Server Implementation (`server/main.go`)**

```go
func (s *server) GetStockPrice(req *pb.StockRequest, stream pb.Greeter_GetStockPriceServer) error {
	log.Printf("Received subscription: %v", req.GetSymbol())
	// Simulate pushing data 5 times
	for i := 0; i < 5; i++ {
		price := 500.0 + rand.Float64()*100
		if err := stream.Send(&pb.StockReply{Symbol: req.GetSymbol(), Price: price}); err != nil {
			return err
		}
		time.Sleep(500 * time.Millisecond)
	}
	return nil // Returning nil means the stream is finished
}
```

**2. Client Call**

**Go:**
Continuously `Recv()` via a loop until `io.EOF` is received.

```go
// 2. Server Streaming
log.Println("\n--- 2. Server Streaming ---")
stream, _ := c.GetStockPrice(context.Background(), &pb.StockRequest{Symbol: "TSMC"})
for {
    res, err := stream.Recv()
    if err == io.EOF { break }
    log.Printf("Stock: %s, Price: %.2f", res.GetSymbol(), res.GetPrice())
}
```

**Python:**
Python's gRPC implementation is very elegant; the return object itself is an Iterator.

```python
print("\n[Server Streaming]")
for stock in stub.GetStockPrice(greeter_pb2.StockRequest(symbol="TSMC')):
    print(f"Stock: {stock.symbol}, Price: {stock.price:.2f}")
```

---

### Level 3: Client Streaming

**Scenario:** IoT sensors uploading large amounts of data, large file uploads.
The Client uploads data multiple times via `stream.Send()`, and after finishing, the Server calculates and returns a single result.

**1. Server Implementation (`server/main.go`)**
The Server needs to use `Recv()` to receive until EOF, and finally use `SendAndClose` to return the result.

```go
func (s *server) RecordMetrics(stream pb.Greeter_RecordMetricsServer) error {
	var sum float64
	var count int32

	for {
		req, err := stream.Recv()
		if err == io.EOF {
			// Reception complete, calculate average and return
			average := 0.0
			if count > 0 { average = sum / float64(count) }
			return stream.SendAndClose(&pb.MetricSummary{
				Count:   count,
				Average: average,
			})
		}
		if err != nil { return err }

		sum += req.GetValue()
		count++
		log.Printf("Received data: %.2f", req.GetValue())
	}
}
```

**2. Client Call**

**Go:**

```go
// 3. Client Streaming
log.Println("\n--- 3. Client Streaming ---")
mStream, _ := c.RecordMetrics(context.Background())
// Simulate uploading data
for _, v := range []float64{25.5, 26.8, 27.1} {
    mStream.Send(&pb.Metric{Value: v})
    time.Sleep(100 * time.Millisecond)
}
// Tell Server I'm done sending, and wait for result
summary, _ := mStream.CloseAndRecv()
log.Printf("Statistics: Count %d, Average %.2f", summary.GetCount(), summary.GetAverage())
```

**Python:**
Use a Generator function to produce the data stream.

```python
print("\n[Client Streaming]")
def generate_metrics():
    for v in [30.5, 31.0, 30.8]:
        print(f"Uploading: {v}")
        yield greeter_pb2.Metric(value=v)
        time.sleep(0.1)

summary = stub.RecordMetrics(generate_metrics())
print(f"Statistics: Count {summary.count}, Average {summary.average:.2f}")
```

---

### Level 4: Bidirectional Streaming

**Scenario:** Chat rooms, online game synchronization.
Client and Server are like making a phone call; both sides' `Send` and `Recv` are independent and parallel.

**1. Server Implementation (`server/main.go`)**

```go
func (s *server) Chat(stream pb.Greeter_ChatServer) error {
	for {
		in, err := stream.Recv()
		if err == io.EOF { return nil }
		if err != nil { return err }

		log.Printf("Received message [%s]: %s", in.GetUser(), in.GetMessage())

		// Can reply at any time after receiving, no need to wait
		reply := "Server received: " + in.GetMessage()
		if err := stream.Send(&pb.ChatMessage{User: "Server", Message: reply}); err != nil {
			return err
		}
	}
}
```

**2. Client Call**

This part is the most complex because it involves simultaneous sending and receiving.

**Go:**
We need to start a Goroutine specifically responsible for "listening (Recv)", while the main program is responsible for "speaking (Send)".

```go
// 4. Bidirectional Streaming
log.Println("\n--- 4. Chat ---")
chatStream, _ := c.Chat(context.Background())
waitc := make(chan struct{})

// Background receive
go func() {
    for {
        in, err := chatStream.Recv()
        if err == io.EOF { close(waitc); return }
        log.Printf("(Receive) %s: %s", in.GetUser(), in.GetMessage())
    }
}()

// Main thread send
chatStream.Send(&pb.ChatMessage{User: "Go", Message: "Hello"})
chatStream.Send(&pb.ChatMessage{User: "Go", Message: "Bye"})
chatStream.CloseSend() // Tell Server I'm done speaking

<-waitc // Wait for reception to finish
```

**Python:**

```python
print("\n[Chat]")
def chat_generator():
    msgs = ["Hi from Python", "Streaming is cool"]
    for m in msgs:
        print(f"(Send) {m}")
        yield greeter_pb2.ChatMessage(user="Python", message=m)
        time.sleep(0.5)

# Python handles concurrency automatically, pass in generator, and iterate over returned results
responses = stub.Chat(chat_generator())
for res in responses:
    print(f"(Receive) {res.user}: {res.message}")
```

---

## 5. Execution Results

1.  Start Server: `go run server/main.go`
2.  Run Go Client: `go run client/main.go`
3.  Run Python Client: `python client/python_client.py`

You will find that whether it's Go or Python, they can communicate smoothly with the Server in various complex ways. This is the power of gRPC!

## Conclusion

In this article, we took a progressive learning path, challenging ourselves from the simplest Unary call all the way to complex bidirectional streaming. By comparing actual Go and Python code, we witnessed how gRPC seamlessly connects services in different languages through a single `.proto` contract.

I hope this article helps you get started with gRPC quickly.

**Note:** If you have any suggestions, questions, or different ideas, feel free to leave a comment or email me. Let's discuss and grow together! :)
{: .notice--success}
