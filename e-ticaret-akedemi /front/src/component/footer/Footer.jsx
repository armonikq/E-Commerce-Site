import React from "react";
import { Box, Grid, Typography, Link, Container, IconButton } from "@mui/joy";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.surface",
        color: "text.secondary",
        py: { xs: 4, sm: 6 },
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        marginTop: "100px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                level="h5"
                fontWeight="bold"
                mb={2}
                sx={{
                  color: "primary.main",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                Hakkımızda
              </Typography>
              <Typography
                level="body-sm"
                sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                Biz, müşterilerimize en kaliteli ürünleri sunmayı hedefleyen bir
                e-ticaret şirketiyiz. Müşteri memnuniyeti bizim için her şeyden
                önemlidir.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                level="h5"
                fontWeight="bold"
                mb={2}
                sx={{
                  color: "primary.main",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                İletişim
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon
                    sx={{ mr: 1, color: "primary.main" }}
                    fontSize="small"
                  />
                  <Typography
                    level="body-sm"
                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    frkayhn128@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PhoneIcon
                    sx={{ mr: 1, color: "primary.main" }}
                    fontSize="small"
                  />
                  <Typography
                    level="body-sm"
                    sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    0541 581 34 18
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                level="h5"
                fontWeight="bold"
                mb={2}
                sx={{
                  color: "primary.main",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              >
                Bizi Takip Edin
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <IconButton
                  aria-label="github"
                  variant="plain"
                  color="#1876D1"
                  component={Link}
                  href="https://github.com/armonikq"
                  target="_blank"
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton
                  aria-label="linkedin"
                  variant="plain"
                  color="#1876D1"
                  component={Link}
                  href="https://www.linkedin.com/in/furkan-ayhan-78776b27a/"
                  target="_blank"
                  sx={{ "&:hover": { color: "primary.main" } }}
                >
                  <LinkedInIcon />
                </IconButton>
    
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Typography
          level="body-xs"
          textAlign="center"
          sx={{
            mt: 4,
            color: "text.tertiary",
            fontSize: { xs: "0.7rem", sm: "0.8rem" },
            borderTop: "1px solid",
            borderColor: "divider",
            pt: 2,
          }}
        >
          © 2024 AyhanTicaret. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
