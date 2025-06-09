import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Container,
  Input,
  Button,
  Form,
  FormGroup,
  Spinner,
  Card,
  CardBody,
} from "reactstrap";
import { Send } from "react-feather";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import "../Css/chat.css";

const ChatMessage = React.memo(({ msg, isLastBotMessageTyping, displayedBotMessage, messageRef }) => {
  const contentToDisplay =
    msg.sender === "bot" && isLastBotMessageTyping
      ? displayedBotMessage
      : msg.text;

  return (
    <div
      ref={messageRef}
      className={`d-flex mb-2 ${
        msg.sender === "user" ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <Card
        className="shadow-sm chat-card"
        style={{
          backgroundColor: msg.sender === "user" ? "#1f2b3a" : "#121212",
          borderRadius: "10px",
          padding: "0.75rem 1rem", 
          color: "#e0e0e0",
          fontSize: "14.5px",
          lineHeight: "1.6",
          fontFamily: "'Inter', system-ui, sans-serif",
            maxWidth: '80%',
        }}
      >
        <CardBody style={{ padding: "0" }}> 
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                      fontSize: "0.88rem",
                      lineHeight: "1.6",
                      background: "#1e1e1e",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                      margin: "0.8rem 0",
                      fontFamily:
                        "Menlo, Monaco, Consolas, 'Courier New', monospace",
                      overflowX: "auto",
                        whiteSpace: 'pre-wrap', // Ensure code wraps
                      wordBreak: 'break-word',
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    style={{
                      backgroundColor: "#2e2e2e",
                      color: "#e6e6e6",
                      fontSize: "0.92rem",
                      padding: "0.15em 0.4em",
                      borderRadius: "4px",
                       wordBreak: 'break-word',
                      fontFamily:
                        "Menlo, Monaco, Consolas, 'Courier New', monospace",
                    }}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p: ({ children, ...props }) => (
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.7",
                    margin: "0.6rem 1rem 1rem 1rem", 
                    color: "#dcdcdc",
                    fontFamily:
                      "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    textAlign: "left", 
                     wordBreak: 'break-word', // Ensure long words break
                    overflowWrap: 'break-word',
                  }}
                  {...props}
                >
                  {children}
                </p>
              ),
              h1: (props) => (
                <h1
                  style={{
                    fontSize: "1.8rem",
                    margin: "1.5rem 1rem 0.8rem 1rem", 
                    borderBottom: "2px solid #666",
                    paddingBottom: "0.4rem",
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontFamily: "'Roboto Slab', serif",
                    textAlign: "left", 
                     wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              h2: (props) => (
                <h2
                  style={{
                    fontSize: "1.4rem",
                    margin: "1.2rem 1rem 0.6rem 1rem", 
                    fontWeight: "600",
                    color: "#eeeeee",
                    fontFamily: "'Roboto', sans-serif",
                    textAlign: "left", 
                                        wordBreak: 'break-word',

                  }}
                  {...props}
                />
              ),
              h3: (props) => (
                <h3
                  style={{
                    fontSize: "1.15rem",
                    margin: "1rem 1rem 0.5rem 1rem", 
                    fontWeight: "500",
                    color: "#cccccc",
                    fontFamily: "'Open Sans', sans-serif",
                    textAlign: "left", 
                      wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              ul: (props) => (
                <ul
                  style={{
                    paddingLeft: "2.5rem", 
                    margin: "0.5rem 1rem", 
                    color: "#bbbbbb",
                    listStyleType: "disc",
                    textAlign: "left", 
                      wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              ol: (props) => (
                <ol
                  style={{
                    paddingLeft: "2.5rem",
                    margin: "0.5rem 1rem",
                    color: "#bbbbbb",
                    listStyleType: "decimal",
                    textAlign: "left", 
                      wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              li: (props) => (
                <li
                  style={{
                    marginBottom: "0.4rem",
                    lineHeight: "1.6",
                    textAlign: "left",
                      wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              a: (props) => (
                <a
                  style={{
                    color: "#5bc0de",
                    textDecoration: "underline",
                    transition: "color 0.3s ease-in-out",
                      wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              blockquote: (props) => (
                <blockquote
                  style={{
                    borderLeft: "5px solid #555",
                    backgroundColor: "#181818",
                    padding: "0.7rem 1.2rem",
                    fontStyle: "italic",
                    margin: "1rem 1rem",
                    color: "#aaaaaa",
                    textAlign: "left", 
                      wordBreak: 'break-word',
                  }}
                  {...props}
                />
              ),
              hr: (props) => (
                <hr
                  style={{
                    borderTop: "1px solid #444",
                    margin: "1.5rem 1rem", 
                  }}
                  {...props}
                />
              ),
            }}
          >
            {contentToDisplay}
          </ReactMarkdown>
        </CardBody>
      </Card>
    </div>
  );
});


export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayedBotMessage, setDisplayedBotMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatContainerRef = useRef(null);
  const messageInputRef = useRef(null);
 const lastMessageRef = useRef(null);


//  useEffect(() => {
//      if (!isTyping && lastMessageRef.current && chatLog.length > 0 && chatLog[chatLog.length - 1].sender === "bot") {
//        const scrollTimer = setTimeout(() => {
//          lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//        }, 50); 
//        return () => clearTimeout(scrollTimer);
//      }
//    }, [isTyping, chatLog.length]);

useEffect(() => {
  const scrollToLast = () => {
    if (
      !isTyping &&
      lastMessageRef.current &&
      chatLog.length > 0 &&
      chatLog[chatLog.length - 1].sender === "bot"
    ) {
      requestAnimationFrame(() => {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };

  // On mobile, delay slightly longer to avoid clash with soft keyboard
  const timeout = setTimeout(scrollToLast, window.innerWidth < 768 ? 150 : 50);

  return () => clearTimeout(timeout);
}, [isTyping, chatLog.length]);



  useEffect(() => {
      if (!isTyping) return;
  
      const lastMessage = chatLog[chatLog.length - 1];
      if (!lastMessage || lastMessage.sender !== "bot" || !lastMessage.text) {
        setIsTyping(false);
        setDisplayedBotMessage("");
        return;
      }
  
      const fullText = lastMessage.text;
  
      if (displayedBotMessage.length >= fullText.length) {
        setIsTyping(false);
        return;
      }
  
      const chunkSize = 25;
      const timeout = setTimeout(() => {
        const nextChunk = fullText.substring(
          0,
          displayedBotMessage.length + chunkSize
        );
        setDisplayedBotMessage(nextChunk);
      }, 15);
  
      return () => clearTimeout(timeout);
    }, [isTyping, displayedBotMessage, chatLog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    // setChatLog((prev) => [...prev, userMessage]);
       setChatLog((prev) => {
      const newChatLog = [...prev, userMessage];
    
      setTimeout(() => {
        if (lastMessageRef.current) {
          lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
      return newChatLog;
    });
    setMessage(""); 

   
     if (messageInputRef.current) {
        messageInputRef.current.focus();
    }
    setTimeout(() => {
        if (messageInputRef.current) {
            messageInputRef.current.focus();
        }
    }, 0);
    setLoading(true); 

    try {
      const res = await axios.post("https://chat-box-tool.vercel.app/api/v1/student/ask", {
        message: userMessage.text,
      });
      const botReply = res.data.reply;

      setChatLog((prev) => [...prev, { sender: "bot", text: botReply }]);

      setDisplayedBotMessage(""); 
      setIsTyping(true); 
    } catch (err) {
      console.error("API Error:", err);
      setChatLog((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
      setIsTyping(false);
      setDisplayedBotMessage(""); 
    } finally {
      setLoading(false); 
    }
  };

  chatContainerRef.current?.scrollTo({
  top: chatContainerRef.current.scrollHeight,
  behavior: "smooth",
});

  return (
    <div className="bg-dark min-vh-100 d-flex flex-column">
      <header className="bg-dark text-white text-center py-4 shadow sticky-top">
        <h1
          className="m-0"
          style={{ fontFamily: "Segoe UI", fontWeight: "600" }}
        >
          GPT Assistant
        </h1>
      </header>

      <Container
        className="flex-grow-1 my-4 overflow-auto d-flex flex-column"
        ref={chatContainerRef}
      >
        <div className="d-flex flex-column gap-3 flex-grow-1">
          {chatLog.map((msg, idx) => (
            <ChatMessage
              key={idx}
              msg={msg}
              isLastBotMessageTyping={
                msg.sender === "bot" && idx === chatLog.length - 1 && isTyping
              }
              displayedBotMessage={displayedBotMessage}
                messageRef={idx === chatLog.length - 1 ? lastMessageRef : null}
            />
          ))}

          {loading && (
            <div className="text-center text-muted align-self-start">
              <Spinner size="sm" /> GPT is thinking...
            </div>
          )}
          {isTyping &&
            displayedBotMessage.length > 0 &&
            chatLog[chatLog.length - 1]?.sender === "bot" && (
              <div className="text-center text-muted align-self-start">
                <Spinner size="sm" /> GPT is typing...
              </div>
            )}
        </div>
      </Container>

      <Form
        onSubmit={handleSubmit}
        className="chat-input-footer bg-dark border-top p-3"
      style={{ backgroundColor: "#1e1e1e", borderTopColor: "#333 !important" }}

      >
        <FormGroup className="d-flex gap-2 mb-0 align-items-center">
          <Input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow-1 chat-input-field"
              disabled={loading || isTyping}
            innerRef={messageInputRef}
            // style={{ color: "white" }}
             style={{
              color: "#343a40", 
              border: "1px solid #444", 
              borderRadius: "20px", 
              padding: "0.75rem 1.25rem", 
              fontSize: "1rem", 
              backgroundColor : loading ? "#343a40" :"white"
            }}
          />
          <Button
            color="primary"
            type="submit"
            disabled={loading || isTyping || !message.trim()}
             style={{
              borderRadius: "50%", 
              width: "45px", 
              height: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              backgroundColor: "#007bff", 
              borderColor: "#007bff",
              boxShadow: "0 2px 5px rgba(0, 123, 255, 0.3)", 
              transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
            }}
             onMouseOver={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#0056b3";
                e.currentTarget.style.borderColor = "#0056b3";
                e.currentTarget.style.boxShadow = "0 3px 8px rgba(0, 123, 255, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "#007bff";
                e.currentTarget.style.borderColor = "#007bff";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 123, 255, 0.3)";
              }
            }}
            onMouseDown={(e) => {
                if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = "#004085"; 
                    e.currentTarget.style.borderColor = "#004085";
                }
            }}
            onMouseUp={(e) => {
                if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = "#0056b3"; 
                    e.currentTarget.style.borderColor = "#0056b3";
                }
            }}
          >
            <Send size={18} />
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}