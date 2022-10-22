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
    {
      name: "Differenze nel testo",
      path: "/difference",
      image: "image/difference.jpg",
    },
    {
      name: "Trova immagini gratuite",
      path: "/findimages",
      image: "image/findimage.jpg",
    },
  ];

  return (
    <BoxLayout>
      <Box
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "inherit" },
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
