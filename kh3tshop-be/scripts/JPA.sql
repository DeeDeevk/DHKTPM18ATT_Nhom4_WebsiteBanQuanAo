

INSERT INTO customer (customer_id, full_name, phone_number, email, gender, date_of_birth, create_at, update_at, status)
VALUES
    (2, 'Leesin', '0911111111', 'leesin@example.com', 'MALE', '1998-03-14', '2024-10-01', '2024-10-01', 'ACTIVE'),
    (3, 'Erling Halland', '0903333444', 'halland@example.com', 'MALE', '2000-07-21', '2024-10-02', '2024-10-02', 'ACTIVE'),
    (4, 'Jeremy Doku', '0905555666', 'doku@example.com', 'MALE', '1995-10-12', '2024-10-03', '2024-10-03', 'ACTIVE'),
    (5, 'Vinicius Junior', '0907777888', 'vinicious@example.com', 'FEMALE', '1999-01-01', '2024-10-04', '2024-10-04', 'ACTIVE'),
    (6, 'Donnarumma', '0911111333', 'donnarumma@example.com', 'MALE', '1997-08-09', '2024-10-05', '2024-10-05', 'ACTIVE'),
    (7, 'Cristiano Ronaldo', '0912222444', 'cr7@example.com', 'FEMALE', '2001-05-05', '2024-10-06', '2024-10-06', 'ACTIVE'),
    (8, 'Phil Foden', '0913333555', 'foden@example.com', 'MALE', '1996-11-25', '2024-10-07', '2024-10-07', 'ACTIVE'),
    (9, 'Sergio Aguero', '0914444666', 'aguero@example.com', 'MALE', '1988-02-07', '2024-10-08', '2024-10-08', 'INACTIVE'),
    (10, 'Messi', '0915555777', 'messi@example.com', 'MALE', '1994-02-02', '2024-10-09', '2024-10-09', 'ACTIVE');





INSERT INTO account (login_id, create_at, password, role, status_login, update_at, username, customer_id)
VALUES
    (2, '2024-10-01', '$2a$10$pdErrGmqR6k4c2cHmTVrCOoKtQmoR.frS.lAFbvU6e7/Cjbnt98Xi', 'USER', 'ACTIVE', '2024-10-01', 'Leesin', 2),
    (3, '2024-10-02', '$2a$10$UwU6c/qJC6Tg9/ySe5RYLOCtH3pTHzakrVAV0hjRfWzNVCe2kyJni','USER' , 'ACTIVE', '2024-10-02', 'Halland', 3),
    (4, '2024-10-03', '$2a$10$ezcfId8HGRycvLNNEQZdG.hLaSJ4xLvNoi0KRUkBU6tgu6vlKN2n2', 'USER', 'ACTIVE', '2024-10-03', 'Doku', 4),
    (5, '2024-10-04', '$2a$10$p1gJ9SJINENQKTZDp02jFOJVy3p3Aci2CNf1AOjR7.PylbyBtGzVm', 'USER', 'ACTIVE', '2024-10-04', 'Vinicious', 5),
    (6, '2024-10-05', '$2a$10$.7Rcw1esqB3LUK.bgVxmo.7jbWjsuckn4rPd4lGniJJdzyHOCh05i', 'USER', 'ACTIVE', '2024-10-05', 'Donnarumma', 6),
    (7, '2024-10-06', '$2a$10$asqFiSnfasSX4/g2fPID4ec9hxDWHbXDDTlN7FEwRpUjGz4itBlPm', 'USER', 'ACTIVE', '2024-10-06', 'CR7', 7),
    (8, '2024-10-07', '$2a$10$lzBHVSAD78l.eR/xM3IrEe2.iMhRwmuEXgSDrHSpJ0DoaojEMu3b2', 'USER', 'ACTIVE', '2024-10-07', 'Foden', 8),
    (9, '2024-10-08', '$2a$10$It2D4MaWB4Hq5PI9JyaUDu9.bscYWA7er6L3ZVv3B3FJl47ndvgH2', 'USER', 'LOCKED', '2024-10-08', 'Aguero', 9),
    (10, '2024-10-09', '$2a$10$rL7cPLbyOKSb7x/ebJM3CuXvv5wC3Ksa6i6L9D.BCLwq0fg9gxRb.', 'STAFF', 'PENDING', '2024-10-09', 'Lionel Messi', 10);



INSERT INTO address (city, province, delivery_address, delivery_note, account_id) VALUES
                                                                                      ('Hà Nội', 'Hà Nội', '123 Đường Giải Phóng, Quận Hai Bà Trưng', 'Giao giờ hành chính', 1),
                                                                                      ('Hà Nội', 'Hà Nội', '45 Trần Duy Hưng, Cầu Giấy', 'Gọi trước khi giao', 1),
                                                                                      ('Hồ Chí Minh', 'TP. Hồ Chí Minh', '25 Nguyễn Huệ, Quận 1', 'Giao buổi sáng', 2),
                                                                                      ('Hồ Chí Minh', 'TP. Hồ Chí Minh', '120 Lê Văn Sỹ, Quận 3', 'Không giao sau 20h', 2),
                                                                                      ('Đà Nẵng', 'Đà Nẵng', '89 Nguyễn Văn Linh, Hải Châu', 'Liên hệ bảo vệ tòa nhà', 3),
                                                                                      ('Cần Thơ', 'Cần Thơ', '56 Nguyễn Trãi, Ninh Kiều', 'Giao nhanh trong ngày', 3),
                                                                                      ('Hải Phòng', 'Hải Phòng', '12 Lạch Tray, Ngô Quyền', 'Để hàng trước cửa', 4),
                                                                                      ('Huế', 'Thừa Thiên Huế', '77 Hùng Vương, Phường Phú Nhuận', 'Người nhận: Anh Minh', 4),
                                                                                      ('Bắc Ninh', 'Bắc Ninh', '09 Nguyễn Gia Thiều, TP. Bắc Ninh', 'Không giao cuối tuần', 5),
                                                                                      ('Nha Trang', 'Khánh Hòa', '50 Trần Phú, TP. Nha Trang', 'Liên hệ trước 30 phút', 5),
                                                                                      ('Biên Hòa', 'Đồng Nai', '150 Võ Thị Sáu, P. Thống Nhất', 'Có thể giao buổi tối', 6),
                                                                                      ('Buôn Ma Thuột', 'Đắk Lắk', '98 Lê Duẩn, TP. Buôn Ma Thuột', 'Giao cho lễ tân', 6),
                                                                                      ('Vũng Tàu', 'Bà Rịa - Vũng Tàu', '12 Hạ Long, Phường 2', 'Cần gọi trước khi đến', 7),
                                                                                      ('Long An', 'Long An', '67 Nguyễn Huệ, Tân An', 'Giao buổi chiều', 7),
                                                                                      ('Hà Tĩnh', 'Hà Tĩnh', '33 Phan Đình Phùng, TP. Hà Tĩnh', 'Nhà gần trường học', 8),
                                                                                      ('Quảng Ninh', 'Quảng Ninh', '88 Trần Quốc Nghiễn, Hạ Long', 'Không gọi cửa', 8),
                                                                                      ('Thái Nguyên', 'Thái Nguyên', '120 Cách Mạng Tháng 8, TP. Thái Nguyên', 'Người nhận là bố tôi', 9),
                                                                                      ('Nam Định', 'Nam Định', '75 Hùng Vương, TP. Nam Định', 'Có chó dữ, gọi trước', 9),
                                                                                      ('Hòa Bình', 'Hòa Bình', '5 Trần Hưng Đạo, TP. Hòa Bình', 'Nhà cuối ngõ nhỏ', 10),
                                                                                      ('Bình Dương', 'Bình Dương', '230 Đại lộ Bình Dương, TP. Thủ Dầu Một', 'Công ty ABC, tầng 3', 10);


-- xiu add hinh vao
INSERT INTO category
(category_name, description, image_url, display_order, is_active, created_at, updated_at)
VALUES
    ('Top', 'Các loại áo như áo thun, sơ mi, hoodie...', 'https://example.com/images/category_top.jpg', 1, true, '2025-11-10', '2025-11-10'),
    ('Bottom', 'Các loại quần như jeans, trousers, shorts...', 'https://example.com/images/category_bottom.jpg', 2, true, '2025-11-10', '2025-11-10'),
    ('Phụ kiện', 'Các loại phụ kiện như ví, mũ, thắt lưng...', 'https://example.com/images/category_accessories.jpg', 3, true, '2025-11-10', '2025-11-10');




INSERT INTO product
(product_name, description, price, cost_price, unit, quantity, image_url_front, image_url_back, created_at, updated_at, brand, rating, category, discount_amount)
VALUES
-- Ví
('Triple Star Small Wallet (ví)', 'Ví nhỏ Triple Star', 350000, 250000, 'cái', 120,
 'https://content.pancake.vn/1/s2360x2950/35/d5/16/04/8a7e15b89251d0132ab9ba5025dbd2f35afaf47ccc47a1bd14541f02-w:2400-h:3000-l:871502-t:image/jpeg.jpeg',
 'https://content.pancake.vn/1/s2360x2950/06/9c/80/1c/fbbe27ea27340bd2cb3467e91d49a6e0e37f33b6651c1a1422ecf38a-w:2400-h:3000-l:703943-t:image/jpeg.jpeg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.5, 3,0),

-- Jeans
('Raw Denim Stitch Baggy Jeans', 'Quần jeans baggy Raw Denim Stitch', 850000, 600000, 'cái', 150,
 'https://content.pancake.vn/1/s2360x2950/88/d3/98/05/f32daa82a82f8cf47c9256f5303cc907852f6f2ad97b0d84cc1e7464-w:2400-h:3000-l:875966-t:image/jpeg.jpeg',
 'https://content.pancake.vn/1/s2360x2950/21/08/9e/78/4ead1df425b3f0caa19594fc6fd40a9418d15d6aefbf95f7f5e85633-w:2400-h:3000-l:906251-t:image/jpeg.jpeg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.2, 2,0),

('WASHED DENIM PANTS INDIGO BLUE', 'Quần denim Indigo Blue', 750000, 500000, 'cái', 140,
 'https://cdn.hstatic.net/products/200001044768/z6863528240337_2c17f9943f30654acfcb076e346a62cb_aec2cec8bc8e4f398f3999da74a77585_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/z6863528225224_97e96053f8344d13989b56cb9863f514_f51b13992f3b4f6aad35d4131935693a_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.3, 2,0),

('LOOSE FIT DENIM PANTS (DIRTY BLUE WASH)', 'Quần denim loose fit màu xanh dơ', 700000, 480000, 'cái', 130,
 'https://cdn.hstatic.net/products/200001044768/maverik11975_f5ee590a05b2463abcd21420a0ccc25d_7856fc166a2345d2a32e27597536dd7d_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/maverik11985_3654084a92f14dd59aafa4c0f81f5fcb_c1e788cb98284fa18fb0684a9e10c6d5_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.4, 2,0),

('LOOSE FIT DENIM PANTS (OFF WHITE)', 'Quần denim loose fit màu trắng ngà', 700000, 480000, 'cái', 160,
 'https://cdn.hstatic.net/products/200001044768/maverik12005_6b7bca086f344e6286273ddeb8dff9fb_b002836cb1004a77a8689a66708991ac_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/maverik12014_ab1e6284959f4e57aaf31f8530044404_eb122ad294044a93ba03272c07e559dd_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.4, 2,0),

('LOOSE FIT RAW DENIM PANTS (BLACK)', 'Quần raw denim loose fit màu đen', 750000, 500000, 'cái', 170,
 'https://cdn.hstatic.net/products/200001044768/maverik111995_ffcb051be7674495b92b1be7b68641b2_6b1c2fe7703340b686a50aa3d598d3b3_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/maverik11999_00ff7877fa584e7a945b8f51ffe0ccda_b8d86a8155074820b5e13e1329db587a_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.5, 2,0),

-- Trousers
('PLEATED TROUSERS (BLACK)', 'Quần xếp ly màu đen', 650000, 450000, 'cái', 125,
 'https://cdn.hstatic.net/products/200001044768/img_5733_8701f4f429ee45b780667745a0894d98_9adf01edd3c54a52baf275a794a06843_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/img_5734_0432536370be4df79f0073d45dc6f550_e7d8546123ee4fb6b3d26a57b49101ac_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.0, 2,0),

('PLEATED TROUSER (GREY)', 'Quần xếp ly màu xám', 650000, 450000, 'cái', 135,
 'https://cdn.hstatic.net/products/200001044768/1331e405-999e-42aa-a2cd-bfb4bc399def_80ff0a43acee4f049597209e3369f29d_65d270cd58714f40bfcf21b8befffc3f_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/12414060-0f74-443e-b2e8-23287d854bc2_eef41c86d1cc494d87f6a34168501afa_b852f2b75b1b4b018218868c8ee53186_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.1, 2,0),

-- WIDE LEG SHORT
('WIDE LEG SHORT', 'Quần short ống rộng phong cách basic', 620000, 420000, 'cái', 150,
 'https://cdn.hstatic.net/products/200001044768/maverik10808_0deb646363e04d099c308c4716d9650e_1848b3194eb54339bbc8efd8ce7dbea5_master.jpg',
 'https://cdn.hstatic.net/products/200001044768/maverik10813_18306169a87d48c8b4d0aef16601970c_bb32a51743e14ba18c7505717b372108_master.jpg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.3, 2,0),

-- Washed Jorts
('Washed Jorts', 'Quần short denim wash dáng rộng', 580000, 400000, 'cái', 130,
 'https://content.pancake.vn/1/s2360x2950/7d/cb/77/12/3658a18f95a81bbeae63064b0a133ec1055bc1ad173e84f5e9c984a1-w:2400-h:3000-l:942162-t:image/jpeg.jpeg',
 'https://content.pancake.vn/1/s2360x2950/68/db/26/51/ffaeccd1e4548ea3f0f1f830d0f213d0e3c86bcd18aac3cc9cc347b4-w:2400-h:3000-l:949630-t:image/jpeg.jpeg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.2, 2,0),

-- Hello Kitty | Monogram Laser Baggy Jeans/ Blue
('Hello Kitty | Monogram Laser Baggy Jeans/ Blue', 'Quần jeans họa tiết Hello Kitty laser độc đáo', 890000, 650000, 'cái', 160,
 'https://content.pancake.vn/1/s2360x2950/2d/0d/4f/5b/b7f983e37623a32d63d7fe5cbd507f6d829dc81600d6915d71e80215-w:2400-h:3000-l:866495-t:image/jpeg.jpeg',
 'https://content.pancake.vn/1/s2360x2950/96/a7/4f/07/f07f02a110fb8870cf5fda26b57eacb2be37f28895c25ba31ec28ebc-w:2400-h:3000-l:871816-t:image/jpeg.jpeg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.6, 2,0),

-- Raw Denim Stitch Jorts
('Raw Denim Stitch Jorts', 'Quần short denim thêu chỉ nổi phong cách street', 640000, 450000, 'cái', 120,
 'https://content.pancake.vn/1/s2360x2950/8e/98/0e/8f/d7ee022ef29029292c42392a46119e9d9237a16442183eeb5eb5a337-w:2400-h:3000-l:758044-t:image/jpeg.jpeg',
 'https://content.pancake.vn/1/s2360x2950/02/c2/d1/77/9c3c25b59550067ac938d6f54d9eaa4ba32a2945d2bbc1d3e07f74c5-w:2400-h:3000-l:699977-t:image/jpeg.jpeg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.3, 2,0),

-- Triple Star Classic Cap (Mũ)
('Triple Star Classic Cap (Mũ)', 'Mũ lưỡi trai phong cách cổ điển thương hiệu KH3T', 350000, 220000, 'cái', 180,
 'https://content.pancake.vn/1/s2360x2950/eb/9d/05/86/c71db778c9fc68b01cfb5567e3aca8afa8cc2f33061aa3320cdfd068-w:3000-h:3750-l:906440-t:image/jpeg.jpeg',
 'https://content.pancake.vn/1/s2360x2950/c8/95/bd/af/6aa65e15b346e85b3e163c75fe3eb934fb1988f2f4a5b761308666a6-w:3000-h:3750-l:772418-t:image/jpeg.jpeg',
 '2025-11-10', '2025-11-10', 'KH3T', 4.5, 2,0),

-- Drawstring Camo Denim Cargo Pants
('Drawstring Camo Denim Cargo Pants', 'Quần cargo denim rằn ri có dây rút', 920000, 700000, 'cái', 150,
 'https://bizweb.dktcdn.net/100/369/010/products/1-78923368-337f-44b9-ac48-be320f783c1e.jpg?v=1759738837640',
 'https://bizweb.dktcdn.net/100/467/832/products/2-b470db82-e71a-4cf9-8e28-62c1c975f57b.jpg?v=1759739709173',
 '2025-11-10', '2025-11-10', 'KH3T', 4.4, 2,0),

-- Embroidery Relaxed Denim Pants
('Embroidery Relaxed Denim Pants', 'Quần jeans thêu thư giãn form rộng', 880000, 600000, 'cái', 110,
 'https://bizweb.dktcdn.net/100/369/010/products/1-ff052270-6218-448d-9e38-dcfbf32e70c5.jpg?v=1741776100473',
 'https://bizweb.dktcdn.net/100/369/010/products/2-f30db60a-39e0-44b3-be80-57747ec52a70.jpg?v=1741776104327',
 '2025-11-10', '2025-11-10', 'KH3T', 4.2, 2,0),

-- Flame Wash Relaxed Denim Pants Black
('Flame Wash Relaxed Denim Pants Black', 'Quần denim wash màu đen họa tiết flame', 940000, 700000, 'cái', 140,
 'https://bizweb.dktcdn.net/100/369/010/products/1-b659b5cb-f76c-41d1-8dce-997a01600581.jpg?v=1741777532280',
 'https://bizweb.dktcdn.net/100/467/832/products/2-6bf4c748-941f-4ead-a7fb-c8da38116b46.jpg?v=1742283113913',
 '2025-11-10', '2025-11-10', 'KH3T', 4.5, 2,0),

-- Embroidery Logo Baggy Denim Shorts - Light Blue
('Embroidery Logo Baggy Denim Shorts - Light Blue', 'Quần short denim baggy thêu logo màu xanh nhạt', 620000, 440000, 'cái', 160,
 'https://bizweb.dktcdn.net/100/369/010/products/1-61e699dd-5311-4a93-bf89-6977dae6d0bd.jpg?v=1725529114293',
 'https://bizweb.dktcdn.net/100/467/832/products/2-d999950b-7978-48d5-9840-3f9080110902.jpg?v=1725536248633',
 '2025-11-10', '2025-11-10', 'KH3T', 4.4, 2,0),

-- Comfy Essential Jeans - Black Wash
('Comfy Essential Jeans - Black Wash', 'Quần jeans basic màu đen wash, form thoải mái', 820000, 600000, 'cái', 150,
 'https://bizweb.dktcdn.net/100/369/010/products/1-63b26a60-2caf-4f8c-965a-302f4dab30f9.jpg?v=1732678937617',
 'https://bizweb.dktcdn.net/100/369/010/products/2-0fba7023-d6c5-4857-8c90-7467f41b8c37.jpg?v=1732678939560',
 '2025-11-10', '2025-11-10', 'KH3T', 4.3, 2,0),

-- Casual Baggy Cargo Pants Black Wash
('Casual Baggy Cargo Pants Black Wash', 'Quần cargo baggy wash đen phong cách casual', 890000, 650000, 'cái', 120,
 'https://bizweb.dktcdn.net/100/369/010/products/1-e5f30f90-2b28-4625-9f96-70d9fbb35806.jpg?v=1736327338300',
 'https://bizweb.dktcdn.net/100/369/010/products/2-eeb798d2-f14e-4433-8fb4-4c9aa6d6a112.jpg?v=1736327341583',
 '2025-11-10', '2025-11-10', 'KH3T', 4.5, 2,0);



INSERT INTO size (name_size) VALUES
                                 ('S'),
                                 ('M'),
                                 ('L'),
                                 ('XL');


-- Triple Star Small Wallet (id=1)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (1, 1, 30),
                                                            (1, 2, 30),
                                                            (1, 3, 30),
                                                            (1, 4, 30);

-- Raw Denim Stitch Baggy Jeans (id=2)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (2, 1, 37),
                                                            (2, 2, 37),
                                                            (2, 3, 38),
                                                            (2, 4, 38);

-- WASHED DENIM PANTS INDIGO BLUE (id=3)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (3, 1, 35),
                                                            (3, 2, 35),
                                                            (3, 3, 35),
                                                            (3, 4, 35);

-- LOOSE FIT DENIM PANTS (DIRTY BLUE WASH) (id=4)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (4, 1, 32),
                                                            (4, 2, 32),
                                                            (4, 3, 33),
                                                            (4, 4, 33);

-- LOOSE FIT DENIM PANTS (OFF WHITE) (id=5)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (5, 1, 40),
                                                            (5, 2, 40),
                                                            (5, 3, 40),
                                                            (5, 4, 40);

-- LOOSE FIT RAW DENIM PANTS (BLACK) (id=6)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (6, 1, 42),
                                                            (6, 2, 42),
                                                            (6, 3, 43),
                                                            (6, 4, 43);

-- PLEATED TROUSERS (BLACK) (id=7)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (7, 1, 31),
                                                            (7, 2, 31),
                                                            (7, 3, 31),
                                                            (7, 4, 32);

-- PLEATED TROUSER (GREY) (id=8)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (8, 1, 34),
                                                            (8, 2, 34),
                                                            (8, 3, 34),
                                                            (8, 4, 33);

-- WIDE LEG SHORT (id=9)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (9, 1, 35), (9, 2, 35), (9, 3, 35), (9, 4, 35);

-- Washed Jorts (id=10)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (10, 1, 40), (10, 2, 40), (10, 3, 40), (10, 4, 40);

-- Hello Kitty Jeans (id=11)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (11, 1, 37), (11, 2, 38), (11, 3, 37), (11, 4, 38);

-- Raw Denim Stitch Jorts (id=12)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (12, 1, 32), (12, 2, 32), (12, 3, 33), (12, 4, 33);

-- Triple Star Classic Cap (id=13)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (13, 1, 30), (13, 2, 30), (13, 3, 30), (13, 4, 30);

-- Drawstring Camo Denim Cargo Pants (id=14)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (14, 1, 37), (14, 2, 38), (14, 3, 37), (14, 4, 38);

-- Embroidery Relaxed Denim Pants (id=15)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (15, 1, 40), (15, 2, 40), (15, 3, 40), (15, 4, 40);

-- Flame Wash Relaxed Denim Pants Black (id=16)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (16, 1, 35), (16, 2, 35), (16, 3, 35), (16, 4, 35);

-- Embroidery Logo Baggy Denim Shorts (id=17)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (17, 1, 32), (17, 2, 33), (17, 3, 32), (17, 4, 33);

-- Comfy Essential Jeans - Black Wash (id=18)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (18, 1, 37), (18, 2, 38), (18, 3, 37), (18, 4, 38);

-- Casual Baggy Cargo Pants Black Wash (id=19)
INSERT INTO size_detail (product_id, size_id, quantity) VALUES
                                                            (19, 1, 42), (19, 2, 42), (19, 3, 43), (19, 4, 43);

-- cart

INSERT INTO cart (cart_id, total_quantity, total_amount, created_at, updated_at, customer_login)
VALUES
    (1, 4, 2750000, '2025-11-10', '2025-11-10', 2),
    (2, 3, 2320000, '2025-11-10', '2025-11-10', 3),
    (3, 5, 4150000, '2025-11-10', '2025-11-10', 4),
    (4, 2, 1700000, '2025-11-10', '2025-11-10', 5),
    (5, 3, 2460000, '2025-11-10', '2025-11-10', 6),
    (6, 4, 3240000, '2025-11-10', '2025-11-10', 7),
    (7, 3, 1810000, '2025-11-10', '2025-11-10', 8),
    (8, 2, 1270000, '2025-11-10', '2025-11-10', 9);


-- cart detail

INSERT INTO cart_detail (
    cart_detail_id,
    quantity,
    price_at_time,
    subtotal,
    is_selected,
    create_at,
    update_at,
    cart_id,
    product_id
)
VALUES
-- Cart 1 (customer_login 2)
(1, 2, 350000, 700000, true, '2025-11-10', '2025-11-10', 1, 1),
(2, 2, 1025000, 2050000, true, '2025-11-10', '2025-11-10', 1, 2),

-- Cart 2 (customer_login 3)
(3, 1, 700000, 700000, true, '2025-11-10', '2025-11-10', 2, 4),
(4, 2, 810000, 1620000, true, '2025-11-10', '2025-11-10', 2, 18),

-- Cart 3 (customer_login 4)
(5, 1, 920000, 920000, true, '2025-11-10', '2025-11-10', 3, 14),
(6, 2, 580000, 1160000, true, '2025-11-10', '2025-11-10', 3, 10),
(7, 2, 935000, 1870000, true, '2025-11-10', '2025-11-10', 3, 16),

-- Cart 4 (customer_login 5)
(8, 2, 850000, 1700000, true, '2025-11-10', '2025-11-10', 4, 2),

-- Cart 5 (customer_login 6)
(9, 1, 640000, 640000, true, '2025-11-10', '2025-11-10', 5, 12),
(10, 2, 910000, 1820000, true, '2025-11-10', '2025-11-10', 5, 14),

-- Cart 6 (customer_login 7)
(11, 2, 620000, 1240000, true, '2025-11-10', '2025-11-10', 6, 17),
(12, 2, 810000, 1620000, true, '2025-11-10', '2025-11-10', 6, 18),
(13, 1, 420000, 420000, true, '2025-11-10', '2025-11-10', 6, 13),

-- Cart 7 (customer_login 8)
(14, 1, 350000, 350000, true, '2025-11-10', '2025-11-10', 7, 13),
(15, 2, 730000, 1460000, true, '2025-11-10', '2025-11-10', 7, 8),

-- Cart 8 (customer_login 9)
(16, 1, 640000, 640000, true, '2025-11-10', '2025-11-10', 8, 12),
(17, 1, 630000, 630000, true, '2025-11-10', '2025-11-10', 8, 7);




INSERT INTO customer_trading (
    trading_id,
    receiver_name,
    receiver_phone,
    receiver_email,
    receiver_address,
    total_amount,
    trading_date,
    created_at,
    updated_at
) VALUES
      (1, 'Leesin', '0911111111', 'leesin@example.com', '123 Đường Giải Phóng, Quận Hai Bà Trưng, Hà Nội',
       2500000, '2025-11-10 09:00:00', '2025-11-10 08:50:00', '2025-11-10 08:50:00'),

      (2, 'Erling Halland', '0903333444', 'halland@example.com', '45 Trần Duy Hưng, Cầu Giấy, Hà Nội',
       3200000, '2025-11-10 10:00:00', '2025-11-10 09:50:00', '2025-11-10 09:50:00'),

      (3, 'Jeremy Doku', '0905555666', 'doku@example.com', '25 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
       2800000, '2025-11-10 11:00:00', '2025-11-10 10:50:00', '2025-11-10 10:50:00'),

      (4, 'Vinicius Junior', '0907777888', 'vinicious@example.com', '120 Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh',
       3100000, '2025-11-10 12:00:00', '2025-11-10 11:50:00', '2025-11-10 11:50:00'),

      (5, 'Donnarumma', '0911111333', 'donnarumma@example.com', '89 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
       2700000, '2025-11-10 13:00:00', '2025-11-10 12:50:00', '2025-11-10 12:50:00'),

      (6, 'Cristiano Ronaldo', '0912222444', 'cr7@example.com', '56 Nguyễn Trãi, Ninh Kiều, Cần Thơ',
       2900000, '2025-11-10 14:00:00', '2025-11-10 13:50:00', '2025-11-10 13:50:00'),

      (7, 'Phil Foden', '0913333555', 'foden@example.com', '12 Lạch Tray, Ngô Quyền, Hải Phòng',
       2600000, '2025-11-10 15:00:00', '2025-11-10 14:50:00', '2025-11-10 14:50:00'),

      (8, 'Sergio Aguero', '0914444666', 'aguero@example.com', '77 Hùng Vương, Phường Phú Nhuận, Huế',
       2400000, '2025-11-10 16:00:00', '2025-11-10 15:50:00', '2025-11-10 15:50:00');



-- Orders
INSERT INTO orders (
    order_id,
    order_code,
    order_date,
    status_ordering,
    note,
    customer_trading_id
)
VALUES
    (1, 'ORD20251110001', '2025-11-10 09:00:00', 'PENDING', 'Giao giờ hành chính', 1),
    (2, 'ORD20251110002', '2025-11-10 10:00:00', 'PENDING', 'Gọi trước khi giao', 2),
    (3, 'ORD20251110003', '2025-11-10 11:00:00', 'PENDING', 'Giao buổi sáng', 3),
    (4, 'ORD20251110004', '2025-11-10 12:00:00', 'PENDING', 'Không giao sau 20h', 4),
    (5, 'ORD20251110005', '2025-11-10 13:00:00', 'PENDING', 'Liên hệ bảo vệ tòa nhà', 5),
    (6, 'ORD20251110006', '2025-11-10 14:00:00', 'PENDING', 'Giao nhanh trong ngày', 6),
    (7, 'ORD20251110007', '2025-11-10 15:00:00', 'PENDING', 'Để hàng trước cửa', 7),
    (8, 'ORD20251110008', '2025-11-10 16:00:00', 'PENDING', 'Người nhận: Anh Long', 8);


-- Order Details (lấy ví dụ 2-3 sản phẩm mỗi order, giữ giá đúng bảng product)
INSERT INTO order_detail (
    order_detail_id,
    product_name,
    quantity,
    unit_price,
    total_price,
    created_at,
    updated_at,
    order_id,
    product_id
)
VALUES
-- Order 1
(1, 'Triple Star Small Wallet (ví)', 2, 350000, 700000, '2025-11-10 09:05:00', '2025-11-10 09:05:00', 1, 1),
(2, 'Raw Denim Stitch Baggy Jeans', 1, 850000, 765000, '2025-11-10 09:06:00', '2025-11-10 09:06:00', 1, 2),

-- Order 2
(3, 'WASHED DENIM PANTS INDIGO BLUE', 2, 750000, 1425000, '2025-11-10 10:05:00', '2025-11-10 10:05:00', 2, 3),
(4, 'LOOSE FIT DENIM PANTS (DIRTY BLUE WASH)', 1, 700000, 700000, '2025-11-10 10:06:00', '2025-11-10 10:06:00', 2, 4),

-- Order 3
(5, 'PLEATED TROUSERS (BLACK)', 1, 650000, 650000, '2025-11-10 11:05:00', '2025-11-10 11:05:00', 3, 7),
(6, 'WIDE LEG SHORT', 2, 620000, 1240000, '2025-11-10 11:06:00', '2025-11-10 11:06:00', 3, 9),

-- Order 4
(7, 'Washed Jorts', 3, 580000, 1740000, '2025-11-10 12:05:00', '2025-11-10 12:05:00', 4, 10),
(8, 'Hello Kitty | Monogram Laser Baggy Jeans/ Blue', 1, 890000, 845500, '2025-11-10 12:06:00', '2025-11-10 12:06:00', 4, 11),

-- Order 5
(9, 'Raw Denim Stitch Jorts', 2, 640000, 1280000, '2025-11-10 13:05:00', '2025-11-10 13:05:00', 5, 12),
(10, 'Triple Star Classic Cap (Mũ)', 1, 350000, 350000, '2025-11-10 13:06:00', '2025-11-10 13:06:00', 5, 13),

-- Order 6
(11, 'Drawstring Camo Denim Cargo Pants', 1, 920000, 920000, '2025-11-10 14:05:00', '2025-11-10 14:05:00', 6, 14),
(12, 'Embroidery Relaxed Denim Pants', 1, 880000, 836000, '2025-11-10 14:06:00', '2025-11-10 14:06:00', 6, 15),

-- Order 7
(13, 'Flame Wash Relaxed Denim Pants Black', 2, 940000, 1880000, '2025-11-10 15:05:00', '2025-11-10 15:05:00', 7, 16),
(14, 'Embroidery Logo Baggy Denim Shorts - Light Blue', 1, 620000, 620000, '2025-11-10 15:06:00', '2025-11-10 15:06:00', 7, 17),

-- Order 8
(15, 'Comfy Essential Jeans - Black Wash', 1, 820000, 820000, '2025-11-10 16:05:00', '2025-11-10 16:05:00', 8, 18),
(16, 'Casual Baggy Cargo Pants Black Wash', 2, 890000, 1780000, '2025-11-10 16:06:00', '2025-11-10 16:06:00', 8, 19);





INSERT INTO invoice (
    invoice_id,
    invoice_code,
    payment_method,
    payment_status,
    subtotal_amount,
    tax_amount,
    total_amount,
    created_at,
    updated_at,
    order_id
) VALUES
      (1, 'INV-20251110-001', 'CASH', 'PAID', 2500000, 0, 2500000, '2025-11-10 08:50:00', '2025-11-10 08:50:00', 1),
      (2, 'INV-20251110-002', 'BANK_TRANSFER', 'UNPAID', 3200000, 0, 3200000, '2025-11-10 09:50:00', '2025-11-10 09:50:00', 2),
      (3, 'INV-20251110-003', 'E_WALLET', 'PAID', 2800000, 0, 2800000, '2025-11-10 10:50:00', '2025-11-10 10:50:00', 3),
      (4, 'INV-20251110-004', 'CASH', 'PAID', 3100000, 0, 3100000, '2025-11-10 11:50:00', '2025-11-10 11:50:00', 4),
      (5, 'INV-20251110-005', 'BANK_TRANSFER', 'UNPAID', 2700000, 0, 2700000, '2025-11-10 12:50:00', '2025-11-10 12:50:00', 5),
      (6, 'INV-20251110-006', 'E_WALLET', 'PAID', 2900000, 0, 2900000, '2025-11-10 13:50:00', '2025-11-10 13:50:00', 6),
      (7, 'INV-20251110-007', 'CASH', 'PAID', 2600000, 0, 2600000, '2025-11-10 14:50:00', '2025-11-10 14:50:00', 7),
      (8, 'INV-20251110-008', 'BANK_TRANSFER', 'UNPAID', 2400000, 0, 2400000, '2025-11-10 15:50:00', '2025-11-10 15:50:00', 8);




-- Tạo bảng wishlist
INSERT INTO wishlist (
    wishlist_id,
    name,
    description,
    created_at,
    updated_at,
    customer_login
) VALUES
      (1, 'Wishlist Leesin', 'Các sản phẩm yêu thích của Leesin', '2025-11-10 08:00:00', '2025-11-10 08:00:00', 2),
      (2, 'Wishlist Halland', 'Các sản phẩm yêu thích của Halland', '2025-11-10 08:10:00', '2025-11-10 08:10:00', 3),
      (3, 'Wishlist Doku', 'Các sản phẩm yêu thích của Doku', '2025-11-10 08:20:00', '2025-11-10 08:20:00', 4),
      (4, 'Wishlist Vinicius', 'Các sản phẩm yêu thích của Vinicius', '2025-11-10 08:30:00', '2025-11-10 08:30:00', 5);

-- Tạo bảng wishlist_detail
INSERT INTO wishlist_detail (
    wishlist_detail_id,
    note,
    created_at,
    wishlist_id,
    product_id
) VALUES
      (1, 'Muốn mua sớm', '2025-11-10 08:05:00', 1, 1),
      (2, 'Xem xét màu sắc khác', '2025-11-10 08:06:00', 1, 3),
      (3, 'Giá hợp lý', '2025-11-10 08:15:00', 2, 2),
      (4, 'Phong cách cá nhân', '2025-11-10 08:16:00', 2, 5),
      (5, 'Mua tặng bạn', '2025-11-10 08:25:00', 3, 6),
      (6, 'Chưa quyết định', '2025-11-10 08:26:00', 3, 7),
      (7, 'Để lại theo dõi', '2025-11-10 08:35:00', 4, 8),
      (8, 'Có thể mua sau', '2025-11-10 08:36:00', 4, 10);





