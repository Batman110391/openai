import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BoxLayout from "../Components/BoxLayout";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Typography } from "@mui/material";
import { deepOrange, deepPurple, lightBlue } from "@mui/material/colors";
import { marvChatBot } from "../api/suggestion";
import Skeleton from "@mui/material/Skeleton";

function ChatBot() {
  const [message, setMessage] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getResponseMarvChat = async (message) => {
    if (Boolean(message.length)) {
      setLoading(true);
      const messageInput = getMessage(message);

      if (Boolean(messageInput)) {
        const response = await marvChatBot(messageInput);

        if (Boolean(response)) {
          setMessage([
            ...message,
            { date: new Date(), message: response, author: "Marv" },
          ]);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const getMessage = (message) => {
    const initialValue = "";
    const inputText = message
      ?.sort((a, b) => a.date - b.date)
      .reduce(
        (prev, curr) => prev + "\n" + curr.author + ":" + curr.message,
        initialValue
      );

    return inputText;
  };

  return (
    <BoxLayout>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: "16px 0px",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "auto",
            p: 1,
          }}
          variant="outlined"
          square
        >
          {loading && <SkeletonLoadingChat />}
          {message.length > 0 &&
            message
              .sort((a, b) => b.date - a.date)
              .map((mess, i) => {
                return (
                  <Message key={i} author={mess.author} text={mess.message} />
                );
              })}
        </Paper>
        <InputChatBox
          message={message}
          setMessage={setMessage}
          getResponseMarvChat={getResponseMarvChat}
        />
      </Box>
    </BoxLayout>
  );
}

export default ChatBot;

function InputChatBox({ message, setMessage, getResponseMarvChat }) {
  const [currMessage, setCurrMessage] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Boolean(currMessage)) {
      const newMessageObj = {
        date: new Date(),
        message: currMessage,
        author: "You",
      };

      setMessage([...message, newMessageObj]);
      setCurrMessage("");

      getResponseMarvChat([...message, newMessageObj]);
    }
  };

  const handleChange = (e) => {
    setCurrMessage(e.target.value);
  };

  return (
    <Paper
      component="form"
      variant="outlined"
      square
      sx={{
        p: "0px 4px 2px 4px",
        marginTop: "0",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
      onSubmit={handleSubmit}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Scrivi a Marv..."
        onChange={handleChange}
        value={currMessage}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={handleSubmit}
        color="primary"
        sx={{ p: "10px" }}
        aria-label="directions"
      >
        <SendIcon color="action" />
      </IconButton>
    </Paper>
  );
}

function Message({ author, text }) {
  const bgcolorAvatar = author === "You" ? deepOrange[500] : deepPurple[500];

  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        width: "auto",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        willChange: "contents",
        marginBottom: "15px",
      }}
    >
      <Avatar sx={{ width: 40, height: 40, bgcolor: bgcolorAvatar }}>
        <Typography color="white" variant="caption">
          {author.toUpperCase()}
        </Typography>
      </Avatar>
      <Paper
        elevatrion={1}
        component="div"
        sx={{
          paddingInline: "16px",
          paddingBlock: "8px",
          borderRadius: "50px 50px 50px 8px",
          bgcolor: lightBlue[300],
          minWidth: "150px",
        }}
      >
        <Typography variant="subtitle1" component="p">
          {text}
        </Typography>
      </Paper>
    </Box>
  );
}

function SkeletonLoadingChat() {
  return (
    <Box
      component="div"
      sx={{
        position: "relative",
        width: "auto",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        willChange: "contents",
        marginBottom: "15px",
      }}
    >
      <Avatar sx={{ width: 40, height: 40 }}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      </Avatar>
      <Paper
        elevatrion={1}
        component="div"
        sx={{
          paddingInline: "16px",
          paddingBlock: "8px",
          borderRadius: "50px 50px 50px 8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Skeleton animation="wave" variant="circular" width={10} height={10} />
        <Skeleton animation="wave" variant="circular" width={10} height={10} />
        <Skeleton animation="wave" variant="circular" width={10} height={10} />
      </Paper>
    </Box>
  );
}
