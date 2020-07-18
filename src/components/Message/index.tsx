import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./styles.css";

interface Message {
  text: string;
  user: string;
}

interface Sender {
  name: string;
}

interface MessageProps {
  message: Message;
  sender: Sender;
}

const Message: React.RefForwardingComponent<HTMLDivElement, MessageProps> = (
  { message, sender },
  ref
) => {
  const isTheSender = message.user === sender.name;

  return (
    <div ref={ref} className={`message ${isTheSender && "message__user"}`}>
      <Card
        className={isTheSender ? "message__userCard" : "message__guestCard"}
      >
        <CardContent>
          <Typography color="initial" variant="h5" component="h2">
            {!isTheSender && `[${message.user || "Unknown User"}] - `}
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default forwardRef(Message);
