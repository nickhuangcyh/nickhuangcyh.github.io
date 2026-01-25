---
layout: post
title: "gRPC 概念與實作 (Go & Python) - 打造高效能微服務"
date: 2026-01-25 23:30:00 +0800
description: "從環境建置到實戰開發，使用 Go 與 Python 一步步實作 gRPC 的四種通訊模式：Unary, Server Streaming, Client Streaming 與 Bidirectional Streaming。"
tags: [gRPC, Golang, Python, Backend]
categories: [Backend Development]
toc:
  sidebar: right
thumbnail: /assets/img/grpc_introduction.png
---

{% include figure.liquid path="assets/img/grpc_introduction.png" title="grpc_introduction" %}

> 您可於此 [grpc-demo repo](https://github.com/nickhuangcyh/grpc-demo) 下載本篇文章的完整程式碼。

## 什麼是 gRPC？

在開始動手寫程式之前，我們先用最直觀的方式來理解 **gRPC** 到底是什麼，以及為什麼它在微服務架構中如此受歡迎。

簡單來說，gRPC 是 Google 開發的一種**遠端程序呼叫（Remote Procedure Call）**系統。別被這個專業名詞嚇到了，我們用一個生活化的例子來理解：

- **本地呼叫 (Local Function Call)**：
  就像你在廚房自己切菜。你大腦下指令「切洋蔥」，你的手立刻就切了。過程最快，沒有延遲。

- **REST API (傳統 HTTP/JSON)**：
  就像你寫了一張詳細的字條（JSON），裝進信封（HTTP），寄給住在另一棟樓的朋友請他切洋蔥。他收到後拆開信封，讀懂字條，切好洋蔥，再寫一張字條回傳給你。這很靈活，但「裝信封」、「寄送」和「解析字條」的過程比較慢。

- **gRPC**：
  就像你和朋友之間拉了一條**專用電話線**，並約定好了一套**暗號**（Protocol Buffers）。你只說「代碼 01, 洋蔥」，他不需要拆信封也不用翻譯，直接執行。

### gRPC 的核心優勢

1.  **極致效能**：使用 **HTTP/2** 傳輸（支援雙向串流、多工），且資料格式是**二進位（Binary）**，比 JSON 輕量非常多。
2.  **強型別契約 (Strict Contract)**：透過 `.proto` 檔案定義介面，Server 和 Client 必須嚴格遵守，不會出現「原本以為是數字，結果傳來字串」的錯誤。
3.  **多語言支援**：Server 用 Go 寫，Client 可以是 Python、Java 或 Node.js，無縫接軌。

本篇文章將帶大家從零開始，配置環境，並使用 **Go (Server)** 與 **Python (Client)**，**一步一步**實作 gRPC 的四種核心通訊模式。

---

## 1. 環境設定 (Prerequisites)

在開始寫程式之前，我們需要安裝編譯器與相關語言的插件。

### 安裝 Protocol Buffers 編譯器 (protoc)

這是 gRPC 的核心工具，用來將 `.proto` 檔案編譯成各個語言的程式碼。

- **macOS**:
  ```bash
  brew install protobuf
  ```
- **Windows**:
  建議使用 Chocolatey 安裝：
  ```bash
  choco install protoc
  ```

### 安裝 Go 語言插件

我們需要安裝 Go 的代碼生成工具，請在終端機執行：

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

**⚠️ 重要設定：**
安裝後，這些工具會放在 `$GOPATH/bin` 下。請務必確保你的系統 `PATH` 包含此路徑。

```bash
# Mac/Linux (加入 .zshrc 或 .bashrc)
export PATH="$PATH:$(go env GOPATH)/bin"

# Windows (PowerShell)
# 請至「編輯系統環境變數」手動將 C:\Users\你的名字\go\bin 加入 Path
```

### 安裝 Python 套件

Client 端我們將使用 Python 來驗證跨語言能力：

```bash
pip install grpcio grpcio-tools
```

---

## 2. 專案結構與初始化

為了讓 Go 和 Python 都能整齊地共用 Proto 檔，我們採用以下結構：

```text
grpc-demo/
├── go.mod
├── proto/              (核心地帶：存放 .proto 與生成碼)
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

初始化專案：

```bash
mkdir grpc-demo
cd grpc-demo
go mod init grpc-demo
```

---

## 3. 定義契約與生成程式碼

在 gRPC 中，一切始於契約。我們先建立 `proto/greeter.proto`。為了教學方便，我們將四種模式的定義一次寫好，後續再逐一實作邏輯。

**proto/greeter.proto**

```protobuf
syntax = "proto3";

option go_package = "./proto";

package greeter;

// 定義服務
service Greeter {
  // 1. Unary
  rpc SayHello (HelloRequest) returns (HelloReply) {}

  // 2. Server Streaming (回傳值有 stream)
  rpc GetStockPrice (StockRequest) returns (stream StockReply) {}

  // 3. Client Streaming (參數有 stream)
  rpc RecordMetrics (stream Metric) returns (MetricSummary) {}

  // 4. Bidirectional Streaming (兩邊都有 stream)
  rpc Chat (stream ChatMessage) returns (stream ChatMessage) {}
}

// --- Message 定義 ---

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

### 生成程式碼

這是最關鍵的一步。我們需要分別生成 Go 和 Python 的程式碼。

**生成 Go 程式碼：**

```bash
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/greeter.proto
```

**生成 Python 程式碼：**
為了避免 Python import 路徑錯誤，我們使用 `-I=proto` 讓生成碼以 proto 資料夾為基準：

```bash
python -m grpc_tools.protoc -I=proto --python_out=proto --grpc_python_out=proto proto/greeter.proto
```

---

## 4. 實戰演練：四種模式一步步實作

接下來我們將依照 gRPC 的四種模式，依序完成 Server 與 Client 的實作。

### 基礎設定：Server 框架

首先，在 `server/main.go` 建立基本的 gRPC Server 架構。

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
	pb "grpc-demo/proto" // 請確認此路徑與 go.mod 一致
)

type server struct {
	pb.UnimplementedGreeterServer
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("無法監聽: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("gRPC Server 啟動於 :50051")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("服務啟動失敗: %v", err)
	}
}
```

### 基礎設定：Client 框架

Client 部分我們準備兩個檔案。

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

    // ... 後續實作將放在這裡 ...
}
```

**Python Client (`client/python_client.py`)**

```python
import sys
import os
import grpc
import time

# [關鍵] 設定路徑以找到 proto 資料夾
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
sys.path.append(os.path.join(project_root, 'proto'))

import greeter_pb2
import greeter_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = greeter_pb2_grpc.GreeterStub(channel)
        # ... 後續實作將放在這裡 ...

if __name__ == '__main__':
    run()
```

---

### 第一關：Unary (單一呼叫)

這是最傳統的模式，類似 HTTP 的 Request/Response。Client 問一次，Server 答一次。

**1. Server 實作 (`server/main.go`)**
在 `server` struct 中加入 `SayHello` 方法：

```go
func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{Message: "Hello " + req.GetName()}, nil
}
```

**2. Client 呼叫**

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

### 第二關：Server Streaming (伺服器串流)

**場景：** 股票報價、直播字幕。
Client 發送一個請求，Server 透過 `stream.Send()` 回傳多次資料，直到結束。

**1. Server 實作 (`server/main.go`)**

```go
func (s *server) GetStockPrice(req *pb.StockRequest, stream pb.Greeter_GetStockPriceServer) error {
	log.Printf("收到訂閱: %v", req.GetSymbol())
	// 模擬推播 5 次數據
	for i := 0; i < 5; i++ {
		price := 500.0 + rand.Float64()*100
		if err := stream.Send(&pb.StockReply{Symbol: req.GetSymbol(), Price: price}); err != nil {
			return err
		}
		time.Sleep(500 * time.Millisecond)
	}
	return nil // 回傳 nil 代表串流結束
}
```

**2. Client 呼叫**

**Go:**
透過迴圈不斷 `Recv()` 直到收到 `io.EOF`。

```go
// 2. Server Streaming
log.Println("\n--- 2. Server Streaming ---")
stream, _ := c.GetStockPrice(context.Background(), &pb.StockRequest{Symbol: "TSMC"})
for {
    res, err := stream.Recv()
    if err == io.EOF { break }
    log.Printf("股票: %s, 價格: %.2f", res.GetSymbol(), res.GetPrice())
}
```

**Python:**
Python 的 gRPC 實作非常優雅，回傳物件本身就是一個 Iterator。

```python
print("\n[Server Streaming]")
for stock in stub.GetStockPrice(greeter_pb2.StockRequest(symbol="TSMC")):
    print(f"股票: {stock.symbol}, 價格: {stock.price:.2f}")
```

---

### 第三關：Client Streaming (客戶端串流)

**場景：** IoT 感測器上傳大量數據、大檔案上傳。
Client 透過 `stream.Send()` 上傳多次資料，結束後 Server 計算並回傳一次結果。

**1. Server 實作 (`server/main.go`)**
Server 需要用 `Recv()` 接收直到 EOF，最後用 `SendAndClose` 回傳結果。

```go
func (s *server) RecordMetrics(stream pb.Greeter_RecordMetricsServer) error {
	var sum float64
	var count int32

	for {
		req, err := stream.Recv()
		if err == io.EOF {
			// 接收完畢，計算平均值並回傳
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
		log.Printf("收到數據: %.2f", req.GetValue())
	}
}
```

**2. Client 呼叫**

**Go:**

```go
// 3. Client Streaming
log.Println("\n--- 3. Client Streaming ---")
mStream, _ := c.RecordMetrics(context.Background())
// 模擬上傳數據
for _, v := range []float64{25.5, 26.8, 27.1} {
    mStream.Send(&pb.Metric{Value: v})
    time.Sleep(100 * time.Millisecond)
}
// 告訴 Server 我傳完了，並等待結果
summary, _ := mStream.CloseAndRecv()
log.Printf("統計結果: 筆數 %d, 平均 %.2f", summary.GetCount(), summary.GetAverage())
```

**Python:**
使用 Generator function 來產生數據串流。

```python
print("\n[Client Streaming]")
def generate_metrics():
    for v in [30.5, 31.0, 30.8]:
        print(f"上傳: {v}")
        yield greeter_pb2.Metric(value=v)
        time.sleep(0.1)

summary = stub.RecordMetrics(generate_metrics())
print(f"統計結果: 筆數 {summary.count}, 平均 {summary.average:.2f}")
```

---

### 第四關：Bidirectional Streaming (雙向串流)

**場景：** 即時聊天室、線上遊戲同步。
Client 和 Server 就像打電話一樣，雙方的 `Send` 和 `Recv` 是獨立並行的。

**1. Server 實作 (`server/main.go`)**

```go
func (s *server) Chat(stream pb.Greeter_ChatServer) error {
	for {
		in, err := stream.Recv()
		if err == io.EOF { return nil }
		if err != nil { return err }

		log.Printf("收到訊息 [%s]: %s", in.GetUser(), in.GetMessage())

		// 收到後可以隨時回覆，不需要等
		reply := "Server 已收到: " + in.GetMessage()
		if err := stream.Send(&pb.ChatMessage{User: "Server", Message: reply}); err != nil {
			return err
		}
	}
}
```

**2. Client 呼叫**

這部分最為複雜，因為要同時收發。

**Go:**
我們需要開一個 Goroutine 專門負責「聽 (Recv)」，主程式負責「講 (Send)」。

```go
// 4. Bidirectional Streaming
log.Println("\n--- 4. Chat ---")
chatStream, _ := c.Chat(context.Background())
waitc := make(chan struct{})

// 背景接收
go func() {
    for {
        in, err := chatStream.Recv()
        if err == io.EOF { close(waitc); return }
        log.Printf("(Receive) %s: %s", in.GetUser(), in.GetMessage())
    }
}()

// 主線程發送
chatStream.Send(&pb.ChatMessage{User: "Go", Message: "Hello"})
chatStream.Send(&pb.ChatMessage{User: "Go", Message: "Bye"})
chatStream.CloseSend() // 告訴 Server 我講完了

<-waitc // 等待接收完畢
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

# Python 會自動處理並發，將 generator 傳入，並迭代回傳結果
responses = stub.Chat(chat_generator())
for res in responses:
    print(f"(Receive) {res.user}: {res.message}")
```

---

## 5. 執行結果

1.  啟動 Server: `go run server/main.go`
2.  執行 Go Client: `go run client/main.go`
3.  執行 Python Client: `python client/python_client.py`

你會發現，無論是 Go 還是 Python，都能順暢地與 Server 進行各種複雜的通訊，這就是 gRPC 強大的地方！

## 總結

在本篇文章中，我們採取了漸進式的學習路徑，從最簡單的 Unary 呼叫，一路挑戰到複雜的雙向串流。透過實際的 Go 與 Python 程式碼對照，我們見證了 gRPC 如何透過一份 `.proto` 契約，讓不同語言的服務無縫接軌。

希望這篇文章能幫助你快速上手 gRPC。

**Note:** 如果有任何建議、問題或不同想法，歡迎留言或寄信給我，可以一起討論進步成長 🙂
{: .notice--success}
