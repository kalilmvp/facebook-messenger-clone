import { FormControl, IconButton, Input } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import firebase from "firebase";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import FlipMove from "react-flip-move";
import "./App.css";
import Message from "./components/Message";
import db from "./utils/firebase";

interface MessageData {
  text: string;
  user: string;
}

interface MessageListData {
  id: string;
  data: MessageData;
}

const App: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<MessageListData[]>([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            } as MessageListData;
          })
        );
      });
  }, []);

  useEffect(() => {
    const userName = prompt("Enter your username: ");
    if (userName) {
      setUserName(userName);
    }
  }, []);

  const handleSendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      db.collection("messages").add({
        text: inputMessage,
        user: userName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setInputMessage("");
    },
    [inputMessage, userName]
  );

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Heeey Messenger Clone 🚀!</h1>
      <h2>Username: {userName}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            type="text"
            placeholder="Enter a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            className="app__iconButton"
            disabled={!inputMessage}
            color="primary"
            onClick={handleSendMessage}
          >
            <Send />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message.data}
            sender={{ name: userName }}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default App;
