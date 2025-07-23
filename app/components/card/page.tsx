import React from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, Chip, Divider } from "@mui/material";
import Carousel from "react-material-ui-carousel";

type ListingCardProps = {
  images: string[];
  title: string;
  description: string;
  condition: string;
  category: string;
  contact: string;
  price: number;
};

const ListingCard: React.FC<ListingCardProps> = ({
  images,
  title,
  description,
  condition,
  category,
  contact,
  price,
}) => {
  return (
    <Card sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, minHeight: 250 }}>
      {/* Carousel Section */}
      <Box sx={{ flex: { xs: "0 0 250px", md: "0 0 350px" }, width: { xs: "100%", md: 350 }, bgcolor: "#eee" }}>
        <Carousel
          navButtonsAlwaysVisible
          autoPlay={false}
          indicators={images.length > 1}
          sx={{ height: 250, width: "100%" }}
        >
          {images.map((img, idx) => (
            <Box
                key={idx}
                component="img"
                src={img}
                alt={`listing image ${idx + 1}`}
                sx={{
                width: "100%",
                height: 250,
                objectFit: "contain",
                borderRadius: 1,
                backgroundColor: "#fff",
                }}
            />
            ))}
        </Carousel>
      </Box>
      {/* Content Section */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {description}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
            <Chip label={`Stanje: ${condition}`} color="info" size="small" />
            <Chip label={`Kategorija: ${category}`} color="primary" size="small" />
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            Kontakt: <b>{contact}</b>
          </Typography>
          <Typography variant="h6" color="success.main" sx={{ mt: 1 }}>
            {price} €
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="primary" fullWidth>
            Kontaktiraj prodavca
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ListingCard;