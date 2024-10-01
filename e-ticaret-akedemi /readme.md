Kurulum;

1. Bilgisayara Node.js İndirin .
2. Backend dosyasında schema.prisma var 3. Satıra mysql adresini giriniz.
3. "backend" dosyasına giriniz ve npm run setup yazın  sonrasında y yazıp enter a basın.
4. "front" dosyasına giriniz npm install yazın .
6. Seed dosyasını çalıştırmak için ise backend dosyasına girin npm run seed-start yazın.
7. Önce backendi ayağa kaldırınız. kaldırmak için ise ====> npm run start yazın
8. front kısmını ayağa kaldırınız. kaldırmak için  ===> npm run dev yazın
9. 3000 ve 5173 portunun bilgisiyarada kullanılmadığına özen gösterin...


MYSQL GEREKLİ KOMUTLAR;
CREATE USER 'furkan'@'localhost' IDENTIFIED BY 'aynfurkan';
GRANT ALL PRIVILEGES ON *.* TO 'furkan'@'localhost';
FLUSH PRIVILEGES;

CREATE DATABASE `mydbo`;


