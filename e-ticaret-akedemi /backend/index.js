const express = require("express");
const cors = require("cors");
const app = express();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const createToken = (email, password) => {
  return Buffer.from(JSON.stringify({ email, password }), "utf-8").toString(
    "base64"
  );
};

const solveToken = (token) => {
  return Buffer.from(token, "base64").toString("utf-8");
};

app.use(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next();
  }
  try {
    const userData = JSON.parse(solveToken(token));
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
      select: { id: true, email: true, name: true, isAdmin: true },
    });
    if (user) {
      if (!user.isAdmin) {
        delete user.isAdmin;
      }
      req.user = user;
    }
  } catch (error) {}
  next();
});

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Yetki yetersiz" });
  }
  next();
};

app.get("/me", requireAuth, (req, res) => {
  res.json(req.user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Geçersiz email veya şifre" });
  }
  const token = createToken(email, password);
  res.json({ token });
});

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name, password },
    });
    const token = createToken(email, password);
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Bu email zaten kullanılıyor" });
    } else {
      res.status(500).json({ error: "Kayıt işlemi başarısız oldu" });
    }
  }
});

app.get("/products", async (req, res) => {
  const q = req.query.q || "";
  const products = await prisma.product.findMany({
    where:
      q.length > 0
        ? {
            OR: [{ name: { contains: q } }, { description: { contains: q } }],
          }
        : undefined,
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  res.json(products);
});

app.post("/products", requireAuth, async (req, res) => {
  const { name, description, price, imageURL, quantity, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: { name, description, price, imageURL, quantity, categoryId },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Ürün oluşturulamadı" });
  }
});

app.put("/products/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageURL, quantity, categoryId } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, imageURL, quantity, categoryId },
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: "Ürün güncellenemedi" });
  }
});

app.delete("/products/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Ürün silinemedi" });
  }
});

app.get("/orders", requireAuth, async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { orderItems: { include: { product: true } } },
  });
  res.json(orders);
});

app.post("/orders", requireAuth, async (req, res) => {
  const { userId, orderItems } = req.body;
  try {
    const order = await prisma.$transaction(async (prisma) => {
      const createdOrder = await prisma.order.create({
        data: {
          userId,
          status: "PENDING",
          total: orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          orderItems: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { orderItems: true },
      });

      for (const item of orderItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return createdOrder;
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: "Sipariş oluşturulamadı" });
  }
});

app.listen(3000, async () => {
  console.log("sunucu başlatıldı.");
  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });
  if (!adminUser) {
    await prisma.user.create({
      data: {
        email: "admin@admin.com",
        name: "Admin",
        password: "admin",
        isAdmin: true,
      },
    });
  }
});
