import { useEffect, useRef, useState } from "react";
import axios from "axios";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: -1,
        sender: "bot",
        text: "Olá, tudo bem? Como posso te ajudar hoje?",
      },
    ]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      sender: "user",
      text,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setText("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:3001/messages", {
        text,
      });

      setTimeout(() => {
        const botMessages: Message[] = response.data.filter(
          (m: Message) => m.sender === "bot"
        );
        setMessages((prev) => [...prev, ...botMessages]);
        setIsTyping(false);
        inputRef.current?.focus();
      }, 1000);
    } catch (err: any) {
      setIsTyping(false);
      alert(
        "Erro ao enviar mensagem: " +
          (err?.response?.data?.error || err.message)
      );
    }
  };

  const salvarResumo = () => {
    const texto = messages
      .map((m) => `${m.sender === "user" ? "Cliente" : "Bot"}: ${m.text}`)
      .join("\n");
    const blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pedido.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const novoPedido = () => {
    setMessages([
      {
        id: -1,
        sender: "bot",
        text: "Olá, tudo bem? Como posso te ajudar hoje?",
      },
    ]);
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial",
        maxWidth: 600,
        margin: "0 auto",
      }}
    >
      <h2>Faça o seu pedido 🍕</h2>

      <div
        ref={chatBoxRef}
        style={{
          marginBottom: 20,
          height: 300,
          overflowY: "auto",
          padding: 10,
          background: "#fafafa",
          borderRadius: 8,
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <div
              style={{
                background:
                  m.id === -1
                    ? "#e1f5fe"
                    : m.text.toLowerCase().includes("pedido completo") ||
                      m.text.toLowerCase().includes("seu pedido foi finalizado")
                    ? "#fff3cd"
                    : m.sender === "user"
                    ? "#dcf8c6"
                    : "#f1f0f0",
                padding: 10,
                borderRadius: 8,
                display: "inline-block",
                maxWidth: "80%",
                border:
                  m.text.toLowerCase().includes("pedido completo") ||
                  m.text.toLowerCase().includes("seu pedido foi finalizado")
                    ? "1px solid #ffeeba"
                    : undefined,
              }}
            >
              <div>{m.text}</div>
              <small
                style={{
                  display: "block",
                  fontSize: 10,
                  textAlign: "right",
                  marginTop: 4,
                }}
              >
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ textAlign: "left", marginTop: 10 }}>
            <span
              style={{
                background: "#f1f0f0",
                padding: 10,
                borderRadius: 8,
                display: "inline-block",
                fontStyle: "italic",
              }}
            >
              Digitando...
            </span>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          placeholder="Digite sua mensagem..."
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{
            width: "80%",
            padding: 10,
            border: "none",
            borderBottom: "1px solid #ccc",
            outline: "none",
            fontSize: 14,
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: 10,
            marginLeft: 10,
            background: "#e1f5fe",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </div>

      <div style={{ marginTop: 10 }}>
        <button
          onClick={novoPedido}
          style={{
            padding: 8,
            background: "#f5f5f5",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Novo Pedido
        </button>

        <button
          onClick={salvarResumo}
          style={{
            padding: 8,
            marginLeft: 10,
            background: "#e0f7fa",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Salvar Pedido
        </button>
      </div>
    </div>
  );
}
