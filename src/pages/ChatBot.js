import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BoxLayout from "../Components/BoxLayout";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

function ChatBot() {
  const [message, setMessage] = React.useState([]);

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
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "auto",
            p: 1,
          }}
          variant="outlined"
          square
        >
          {message.length > 0 &&
            message
              .sort((a, b) => b.date - a.date)
              .map((mess) => {
                return (
                  <div>
                    {mess.author} : {mess.message}
                  </div>
                );
              })}
        </Paper>
        <InputChatBox message={message} setMessage={setMessage} />
      </Box>
    </BoxLayout>
  );
}

export default ChatBot;

function InputChatBox({ message, setMessage }) {
  const [currMessage, setCurrMessage] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage([...message, currMessage]);
    setCurrMessage({});
  };

  const handleChange = (e) => {
    setCurrMessage({
      date: new Date(),
      message: e.target.value,
      author: "You",
    });
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
        value={currMessage?.message || ""}
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
