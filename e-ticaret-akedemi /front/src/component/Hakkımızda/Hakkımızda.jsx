import React from "react";
import { Container, Typography, Box, Grid, Paper, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

function Hakkimizda() {
  const features = [
    {
      icon: <ShoppingCartIcon fontSize="large" />,
      title: "Geniş Ürün Yelpazesi",
      description:
        "Binlerce ürün çeşidi ile her ihtiyacınıza uygun seçenekler sunuyoruz.",
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Güvenli Alışveriş",
      description:
        "En son güvenlik teknolojileri ile verileriniz ve alışverişleriniz güvende.",
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "7/24 Müşteri Desteği",
      description: "Sorularınız ve talepleriniz için her zaman yanınızdayız.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Paper
        elevation={3}
        sx={{ padding: 5, borderRadius: 4, backgroundColor: "#f5f5f5" }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            marginBottom: 4,
            textAlign: "center",
            color: "#1976d2",
          }}
        >
          Hakkımızda
        </Typography>
        <Typography
          variant="h6"
          paragraph
          sx={{ marginBottom: 3, lineHeight: 1.6, textAlign: "center" }}
        >
          AyhanTicaret, müşterilerine en kaliteli ürünleri en uygun fiyatlarla
          sunmayı amaçlayan yenilikçi bir e-ticaret platformudur.
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: 2, marginBottom: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#1976d2",
                    marginBottom: 2,
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" sx={{ marginBottom: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body1"

          sx={{ marginBottom: 2, lineHeight: 1.6 }}
        >
          Müşteri memnuniyetini en ön planda tutarak, güvenilir ve hızlı hizmet
          anlayışıyla sektördeki yerimizi güçlendirmekteyiz. Geniş ürün
          yelpazemiz, rekabetçi fiyatlarımız ve kullanıcı dostu arayüzümüz ile
          alışveriş deneyiminizi en üst seviyeye çıkarmayı hedefliyoruz.
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
          Siz değerli müşterilerimize en iyi alışveriş deneyimini sunmak için
          sürekli kendimizi geliştiriyor, teknolojik yenilikleri takip ediyor ve
          hizmet kalitemizi her geçen gün artırıyoruz. AyhanTicaret ailesi
          olarak, sizlere hizmet vermekten gurur duyuyor ve güveniniz için
          teşekkür ediyoruz.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Hakkimizda;
