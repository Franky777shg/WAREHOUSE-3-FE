import React from "react";
import { Box, Stack, Card, CardContent } from "@mui/material";

const PopularCategories = () => {
  return (
    <Box sx={{ mb: 10 }}>
      <Stack></Stack>
      <Stack direction="row" spacing={2}>
        <Card style={style.card}>
          <CardContent>123</CardContent>
        </Card>
        <Card style={style.card}>
          <CardContent>123</CardContent>
        </Card>
        <Card style={style.card}>
          <CardContent>123</CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

const style = {
  carouselContainer: {
    width: "100%",
    height: "200px",
    marginTop: "20px",
  },
  carouselImg: {
    width: "100%",
  },
  card: {
    width: "200px",
    height: "200px",
  },
};

export default PopularCategories;
