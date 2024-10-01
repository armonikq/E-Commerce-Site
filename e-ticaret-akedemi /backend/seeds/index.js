const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const categories = require("./kategoriler.json");
const products = require("./urunler.json");

async function main() {
  console.log("Seeding başlatılıyor...");

  const orders = await prisma.order.findMany();
  if (orders.length > 0) {
    // ürünlerin silinmesi için önce orderların silinmesi gerekiyor sebebide foreign key kısıtlamasından dolayı hocam
    await prisma.orderItem.deleteMany({});
    await prisma.order.deleteMany({});
    console.log("Orderlar silindi.");
  }

  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("Mevcut veriler silindi.");

  for (const category of categories) {
    await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
      },
    });
  }
  console.log("Kategoriler eklendi.");


  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageURL: product.imageURL,
        quantity: product.quantity,
        categoryId: product.categoryId,
      },
    });
  }

  console.log("Ürünler eklendi.");

  console.log("Seeding tamamlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
