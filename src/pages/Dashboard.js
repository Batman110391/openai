import React from "react";
import BoxLayout from "../Components/BoxLayout";
import Box from "@mui/material/Box";
import CardApp from "../Components/CardApp";

function Dashboard() {
  const applications = [
    {
      name: "ChatBot",
      path: "/chatbot",
      image: "image/chatbot.jpg",
    },
    {
      name: "Recensioni",
      path: "/review",
      image: "image/review.png",
    },
  ];

  return (
    <BoxLayout>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          justifyContent: { xs: "center" },
        }}
      >
        {applications.map((app, i) => (
          <CardApp key={i} title={app.name} path={app.path} image={app.image} />
        ))}
      </Box>
    </BoxLayout>
  );
}

export default Dashboard;
