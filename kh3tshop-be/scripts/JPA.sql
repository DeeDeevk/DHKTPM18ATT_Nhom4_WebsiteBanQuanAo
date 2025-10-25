INSERT INTO address (city, province, country, delivery_address, delivery_note, account_id) VALUES
                                                                                               ('Hà Nội', 'Hà Nội', 'Việt Nam', '123 Đường Giải Phóng, Quận Hai Bà Trưng', 'Giao giờ hành chính', 1),
                                                                                               ('Hà Nội', 'Hà Nội', 'Việt Nam', '45 Trần Duy Hưng, Cầu Giấy', 'Gọi trước khi giao', 1),
                                                                                               ('Hồ Chí Minh', 'TP. Hồ Chí Minh', 'Việt Nam', '25 Nguyễn Huệ, Quận 1', 'Giao buổi sáng', 2),
                                                                                               ('Hồ Chí Minh', 'TP. Hồ Chí Minh', 'Việt Nam', '120 Lê Văn Sỹ, Quận 3', 'Không giao sau 20h', 2),
                                                                                               ('Đà Nẵng', 'Đà Nẵng', 'Việt Nam', '89 Nguyễn Văn Linh, Hải Châu', 'Liên hệ bảo vệ tòa nhà', 3),
                                                                                               ('Cần Thơ', 'Cần Thơ', 'Việt Nam', '56 Nguyễn Trãi, Ninh Kiều', 'Giao nhanh trong ngày', 3),
                                                                                               ('Hải Phòng', 'Hải Phòng', 'Việt Nam', '12 Lạch Tray, Ngô Quyền', 'Để hàng trước cửa', 4),
                                                                                               ('Huế', 'Thừa Thiên Huế', 'Việt Nam', '77 Hùng Vương, Phường Phú Nhuận', 'Người nhận: Anh Minh', 4),
                                                                                               ('Bắc Ninh', 'Bắc Ninh', 'Việt Nam', '09 Nguyễn Gia Thiều, TP. Bắc Ninh', 'Không giao cuối tuần', 5),
                                                                                               ('Nha Trang', 'Khánh Hòa', 'Việt Nam', '50 Trần Phú, TP. Nha Trang', 'Liên hệ trước 30 phút', 5),
                                                                                               ('Biên Hòa', 'Đồng Nai', 'Việt Nam', '150 Võ Thị Sáu, P. Thống Nhất', 'Có thể giao buổi tối', 6),
                                                                                               ('Buôn Ma Thuột', 'Đắk Lắk', 'Việt Nam', '98 Lê Duẩn, TP. Buôn Ma Thuột', 'Giao cho lễ tân', 6),
                                                                                               ('Vũng Tàu', 'Bà Rịa - Vũng Tàu', 'Việt Nam', '12 Hạ Long, Phường 2', 'Cần gọi trước khi đến', 7),
                                                                                               ('Long An', 'Long An', 'Việt Nam', '67 Nguyễn Huệ, Tân An', 'Giao buổi chiều', 7),
                                                                                               ('Hà Tĩnh', 'Hà Tĩnh', 'Việt Nam', '33 Phan Đình Phùng, TP. Hà Tĩnh', 'Nhà gần trường học', 8),
                                                                                               ('Quảng Ninh', 'Quảng Ninh', 'Việt Nam', '88 Trần Quốc Nghiễn, Hạ Long', 'Không gọi cửa', 8),
                                                                                               ('Thái Nguyên', 'Thái Nguyên', 'Việt Nam', '120 Cách Mạng Tháng 8, TP. Thái Nguyên', 'Người nhận là bố tôi', 9),
                                                                                               ('Nam Định', 'Nam Định', 'Việt Nam', '75 Hùng Vương, TP. Nam Định', 'Có chó dữ, gọi trước', 9),
                                                                                               ('Hòa Bình', 'Hòa Bình', 'Việt Nam', '5 Trần Hưng Đạo, TP. Hòa Bình', 'Nhà cuối ngõ nhỏ', 10),
                                                                                               ('Bình Dương', 'Bình Dương', 'Việt Nam', '230 Đại lộ Bình Dương, TP. Thủ Dầu Một', 'Công ty ABC, tầng 3', 10);

INSERT INTO cart (total_quantity, total_amount, created_at, updated_at, customer_login) VALUES
                                                                                            (3, 450000, '2024-01-15 10:32:00', '2024-01-16 11:05:00', 1),
                                                                                            (5, 780000, '2024-02-03 09:12:00', '2024-02-04 10:00:00', 1),
                                                                                            (1, 120000, '2024-02-20 08:45:00', '2024-02-21 09:00:00', 1),

                                                                                            (2, 230000, '2024-03-01 14:22:00', '2024-03-02 09:00:00', 2),
                                                                                            (4, 910000, '2024-04-05 17:10:00', '2024-04-06 08:00:00', 2),
                                                                                            (6, 1100000, '2024-05-10 11:00:00', '2024-05-11 13:30:00', 2),

                                                                                            (2, 550000, '2024-06-01 08:00:00', '2024-06-01 09:30:00', 3),
                                                                                            (8, 2400000, '2024-07-05 16:40:00', '2024-07-06 07:10:00', 3),
                                                                                            (3, 660000, '2024-08-12 10:10:00', '2024-08-12 10:20:00', 3),

                                                                                            (1, 89000, '2024-09-02 09:00:00', '2024-09-03 09:15:00', 4),
                                                                                            (5, 1340000, '2024-10-10 12:45:00', '2024-10-11 13:10:00', 4),
                                                                                            (2, 270000, '2024-11-15 15:20:00', '2024-11-16 08:00:00', 4),

                                                                                            (4, 930000, '2024-12-01 10:00:00', '2024-12-02 11:00:00', 5),
                                                                                            (7, 1830000, '2024-12-20 14:15:00', '2024-12-21 09:30:00', 5),
                                                                                            (3, 620000, '2025-01-05 08:45:00', '2025-01-06 09:00:00', 5),

                                                                                            (2, 500000, '2025-02-03 11:00:00', '2025-02-03 11:15:00', 6),
                                                                                            (6, 1450000, '2025-02-25 17:20:00', '2025-02-26 08:00:00', 6),
                                                                                            (1, 99000, '2025-03-10 08:10:00', '2025-03-10 08:20:00', 6),

                                                                                            (3, 450000, '2025-03-25 10:00:00', '2025-03-25 10:45:00', 7),
                                                                                            (9, 2750000, '2025-04-10 16:30:00', '2025-04-11 09:00:00', 7),
                                                                                            (4, 880000, '2025-04-25 09:00:00', '2025-04-26 09:05:00', 7),

                                                                                            (2, 390000, '2025-05-01 08:30:00', '2025-05-02 08:50:00', 8),
                                                                                            (5, 1210000, '2025-05-15 10:10:00', '2025-05-16 11:30:00', 8),
                                                                                            (7, 1990000, '2025-06-01 17:00:00', '2025-06-02 08:00:00', 8),

                                                                                            (2, 480000, '2025-06-10 09:00:00', '2025-06-11 09:30:00', 9),
                                                                                            (4, 960000, '2025-07-05 10:30:00', '2025-07-06 08:15:00', 9),
                                                                                            (6, 1820000, '2025-07-20 12:00:00', '2025-07-21 09:00:00', 9),

                                                                                            (3, 620000, '2025-08-01 08:30:00', '2025-08-02 10:00:00', 10),
                                                                                            (5, 1450000, '2025-08-15 14:00:00', '2025-08-16 08:30:00', 10),
                                                                                            (8, 2330000, '2025-09-05 09:30:00', '2025-09-06 09:00:00', 10);

INSERT INTO cart_detail (quantity, price_at_time, subtotal, note, is_selected, create_at, update_at, cart_id, product_id)
VALUES
-- Cart 1: 2 áo
(1, 250000, 250000, 'Áo thun trắng size M', TRUE, '2024-02-15', '2024-02-20', 1, 1),
(2, 300000, 600000, 'Áo sơ mi caro đỏ', TRUE, '2024-02-15', '2024-02-21', 1, 2),

-- Cart 2: 2 quần
(1, 450000, 450000, 'Quần jean xanh', TRUE, '2024-03-10', '2024-03-15', 2, 3),
(1, 380000, 380000, 'Quần kaki be', TRUE, '2024-03-11', '2024-03-16', 2, 4),

-- Cart 3: 1 áo, 1 quần
(1, 320000, 320000, 'Áo polo nam', TRUE, '2024-04-05', '2024-04-10', 3, 5),
(1, 280000, 280000, 'Quần short thể thao', TRUE, '2024-04-06', '2024-04-10', 3, 6),

-- Cart 4: 3 áo
(2, 290000, 580000, 'Áo phông unisex', TRUE, '2024-05-01', '2024-05-03', 4, 7),
(1, 450000, 450000, 'Áo khoác hoodie đen', FALSE, '2024-05-02', '2024-05-04', 4, 8),
(1, 350000, 350000, 'Áo sơ mi trắng công sở', TRUE, '2024-05-03', '2024-05-05', 4, 9),

-- Cart 5: 2 quần
(1, 500000, 500000, 'Quần jogger nam', TRUE, '2024-06-10', '2024-06-12', 5, 10),
(2, 420000, 840000, 'Quần tây công sở', TRUE, '2024-06-10', '2024-06-13', 5, 11),

-- Cart 6: 2 áo
(1, 270000, 270000, 'Áo polo trắng', TRUE, '2024-07-01', '2024-07-03', 6, 12),
(1, 330000, 330000, 'Áo sơ mi ngắn tay', TRUE, '2024-07-02', '2024-07-04', 6, 13),

-- Cart 7: 1 quần
(1, 390000, 390000, 'Quần kaki xám', TRUE, '2024-07-10', '2024-07-15', 7, 14),

-- Cart 8: 3 áo
(1, 250000, 250000, 'Áo ba lỗ thể thao', TRUE, '2024-08-01', '2024-08-05', 8, 15),
(1, 480000, 480000, 'Áo khoác bomber', TRUE, '2024-08-01', '2024-08-06', 8, 16),
(1, 310000, 310000, 'Áo sweater mùa thu', TRUE, '2024-08-02', '2024-08-06', 8, 17),

-- Cart 9: 2 quần
(1, 450000, 450000, 'Quần jean rách gối', TRUE, '2024-09-01', '2024-09-03', 9, 18),
(2, 240000, 480000, 'Quần short jean nữ', TRUE, '2024-09-02', '2024-09-05', 9, 19),

-- Cart 10: 2 áo
(1, 370000, 370000, 'Áo sơ mi tay dài', TRUE, '2024-09-22', '2024-09-25', 10, 20),
(2, 260000, 520000, 'Áo thun basic', FALSE, '2024-09-22', '2024-09-26', 10, 1),

-- Cart 11: 2 quần
(1, 430000, 430000, 'Quần vải đen', TRUE, '2025-01-10', '2025-01-15', 11, 2),
(1, 350000, 350000, 'Quần ống rộng nữ', TRUE, '2025-01-11', '2025-01-16', 11, 3),

-- Cart 12: 1 áo
(1, 490000, 490000, 'Áo sơ mi cổ tàu', FALSE, '2025-02-01', '2025-02-05', 12, 4),

-- Cart 13: 2 áo, 1 quần
(1, 330000, 330000, 'Áo polo đen', TRUE, '2025-02-12', '2025-02-14', 13, 5),
(1, 420000, 420000, 'Áo khoác gió', TRUE, '2025-02-12', '2025-02-14', 13, 6),
(1, 380000, 380000, 'Quần jogger xám', TRUE, '2025-02-13', '2025-02-15', 13, 7),

-- Cart 14: 2 quần
(2, 270000, 540000, 'Quần short kaki', TRUE, '2025-03-01', '2025-03-05', 14, 8),
(1, 490000, 490000, 'Quần jean slim fit', FALSE, '2025-03-02', '2025-03-06', 14, 9),

-- Cart 15: 3 áo
(1, 270000, 270000, 'Áo phông cổ tròn', TRUE, '2025-04-10', '2025-04-12', 15, 10),
(1, 350000, 350000, 'Áo sơ mi sọc caro', TRUE, '2025-04-11', '2025-04-13', 15, 11),
(1, 290000, 290000, 'Áo thun cổ tim', TRUE, '2025-04-12', '2025-04-13', 15, 12),

-- Cart 16–30 (rút gọn, vẫn áo/quần)
(1, 380000, 380000, 'Áo sơ mi linen', TRUE, '2025-05-01', '2025-05-03', 16, 13),
(2, 420000, 840000, 'Quần âu xanh navy', TRUE, '2025-05-02', '2025-05-05', 17, 14),
(1, 310000, 310000, 'Áo thun tay ngắn', TRUE, '2025-05-03', '2025-05-06', 18, 15),
(1, 520000, 520000, 'Quần jean đen', TRUE, '2025-06-01', '2025-06-03', 19, 16),
(2, 270000, 540000, 'Áo polo thể thao', TRUE, '2025-06-02', '2025-06-05', 20, 17),
(1, 410000, 410000, 'Quần tây xám nhạt', TRUE, '2025-07-01', '2025-07-03', 21, 18),
(2, 350000, 700000, 'Áo khoác nỉ', TRUE, '2025-07-02', '2025-07-05', 22, 19),
(1, 260000, 260000, 'Áo sơ mi trắng trơn', TRUE, '2025-08-01', '2025-08-03', 23, 20),
(1, 490000, 490000, 'Quần jogger thể thao', TRUE, '2025-08-02', '2025-08-04', 24, 1),
(2, 330000, 660000, 'Áo thun cổ tròn', TRUE, '2025-09-01', '2025-09-03', 25, 2),
(1, 430000, 430000, 'Quần kaki nam', TRUE, '2025-09-04', '2025-09-06', 26, 3),
(1, 360000, 360000, 'Áo sơ mi xanh pastel', TRUE, '2025-09-10', '2025-09-12', 27, 4),
(1, 310000, 310000, 'Áo phông cổ bẻ', TRUE, '2025-09-11', '2025-09-13', 28, 5),
(1, 480000, 480000, 'Quần jean nữ', TRUE, '2025-09-20', '2025-09-22', 29, 6),
(1, 540000, 540000, 'Quần âu đen', TRUE, '2025-10-01', '2025-10-02', 30, 7);

-- chua sua hinh anh
INSERT INTO product (product_name, description, price, cost_price, cost_quantity, unit, image_url, created_at, updated_at, brand, rating, size, category)
VALUES
-- 1–10: ÁO
('Áo thun trắng basic', 'Áo thun cotton thoáng mát, dễ phối đồ.', 250000, 150000, 100, 'cái', 'https://example.com/images/product1.jpg', '2024-01-05 10:00:00', '2024-05-10 12:00:00', 'Coolmate', 4.6, 'M', 1),
('Áo sơ mi caro đỏ', 'Áo sơ mi caro phong cách Hàn Quốc.', 300000, 180000, 80, 'cái', 'https://example.com/images/product2.jpg', '2024-02-12 09:30:00', '2024-05-18 14:00:00', 'Routine', 4.8, 'L', 1),
('Áo polo nam cổ bẻ', 'Áo polo lịch sự, phù hợp môi trường công sở.', 320000, 200000, 120, 'cái', 'https://example.com/images/product3.jpg', '2024-03-08 11:00:00', '2024-06-02 09:00:00', 'Yody', 4.7, 'L', 1),
('Áo khoác hoodie đen', 'Áo hoodie unisex nỉ dày, giữ ấm tốt.', 450000, 280000, 90, 'cái', 'https4://example.com/images/product4.jpg', '2024-04-15 13:00:00', '2024-07-10 10:00:00', 'Levents', 4.9, 'XL', 1),
('Áo sơ mi trắng trơn', 'Áo sơ mi công sở trắng, dễ phối với quần tây.', 350000, 220000, 75, 'cái', 'https://example.com/images/product5.jpg', '2024-05-05 09:45:00', '2024-08-01 12:00:00', 'Routine', 4.5, 'L', 1),
('Áo sweater mùa thu', 'Áo sweater unisex, form rộng, phong cách trẻ trung.', 310000, 190000, 60, 'cái', 'https://example.com/images/product6.jpg', '2024-06-20 10:00:00', '2024-08-25 15:00:00', 'DirtyCoins', 4.6, 'XL', 1),
('Áo phông cổ tròn', 'Áo phông nam cổ tròn chất vải dày dặn.', 270000, 160000, 150, 'cái', 'https://example.com/images/product7.jpg', '2024-07-01 08:00:00', '2024-09-01 09:00:00', 'Coolmate', 4.4, 'M', 1),
('Áo sơ mi sọc caro', 'Áo sơ mi sọc caro trẻ trung, dễ phối.', 350000, 210000, 100, 'cái', 'https://example.com/images/product8.jpg', '2024-07-22 10:00:00', '2024-09-15 13:00:00', 'Yody', 4.7, 'L', 1),
('Áo khoác nỉ', 'Áo khoác nỉ form rộng, mặc thoải mái.', 350000, 250000, 95, 'cái', 'https://example.com/images/product9.jpg', '2024-08-10 11:30:00', '2024-10-05 09:00:00', 'Levents', 4.6, 'XL', 1),
('Áo thun thể thao', 'Áo thể thao thoáng khí, hút mồ hôi nhanh.', 260000, 150000, 200, 'cái', 'https://example.com/images/product10.jpg', '2024-09-01 09:00:00', '2024-11-01 12:00:00', 'Coolmate', 4.5, 'M', 1),

-- 11–20: QUẦN
('Quần jean xanh', 'Quần jean nam form slim-fit.', 450000, 300000, 120, 'cái', 'https://example.com/images/product11.jpg', '2024-02-05 10:00:00', '2024-06-10 12:00:00', 'Routine', 4.8, 'L', 2),
('Quần kaki be', 'Quần kaki màu be nhẹ nhàng, lịch sự.', 380000, 250000, 110, 'cái', 'https://example.com/images/product12.jpg', '2024-03-12 09:00:00', '2024-07-10 12:00:00', 'Yody', 4.7, 'M', 2),
('Quần jogger nam', 'Quần jogger thể thao co giãn tốt.', 500000, 320000, 80, 'cái', 'https://example.com/images/product13.jpg', '2024-04-20 10:30:00', '2024-08-15 10:00:00', 'Levents', 4.8, 'L', 2),
('Quần tây công sở', 'Quần tây lịch sự phù hợp dân văn phòng.', 420000, 270000, 90, 'cái', 'https://example.com/images/product14.jpg', '2024-05-05 09:45:00', '2024-09-02 14:00:00', 'Routine', 4.6, 'M', 2),
('Quần short kaki', 'Quần short kaki nam, mát mẻ ngày hè.', 270000, 180000, 140, 'cái', 'https://example.com/images/product15.jpg', '2024-06-01 11:00:00', '2024-10-01 09:00:00', 'Coolmate', 4.5, 'L', 2),
('Quần jean rách gối', 'Quần jean phong cách cá tính, rách nhẹ.', 450000, 300000, 100, 'cái', 'https://example.com/images/product16.jpg', '2024-06-20 09:00:00', '2024-11-15 12:00:00', 'DirtyCoins', 4.7, 'L', 2),
('Quần âu đen', 'Quần âu đen phù hợp môi trường công sở.', 540000, 350000, 70, 'cái', 'https://example.com/images/product17.jpg', '2024-07-15 09:00:00', '2024-12-01 12:00:00', 'Routine', 4.9, 'M', 2),
('Quần jean nữ', 'Quần jean nữ form ôm co giãn tốt.', 480000, 320000, 130, 'cái', 'https://example.com/images/product18.jpg', '2024-08-01 08:30:00', '2024-12-20 15:00:00', 'Yody', 4.7, 'S', 2),
('Quần jogger thể thao', 'Quần jogger dáng rộng, co giãn 4 chiều.', 490000, 300000, 110, 'cái', 'https://example.com/images/product19.jpg', '2024-09-01 10:00:00', '2025-01-05 09:00:00', 'Coolmate', 4.8, 'L', 2),
('Quần kaki nam', 'Quần kaki basic dễ phối đồ.', 430000, 270000, 90, 'cái', 'https://example.com/images/product20.jpg', '2024-09-25 09:30:00', '2025-02-10 10:00:00', 'Routine', 4.6, 'L', 2);

--xem lai category gom cac con naop
INSERT INTO category (category_name, slug, description, image_url, display_order, is_active, created_at, updated_at, parent_id)
VALUES
    ('Thời trang Nam', 'thoi-trang-nam', 'Danh mục chính cho sản phẩm thời trang nam.', 'https://example.com/images/cat_men.jpg', 1, TRUE, '2024-01-01 09:00:00', '2024-12-10 10:00:00', NULL),
    ('Thời trang Nữ', 'thoi-trang-nu', 'Danh mục chính cho sản phẩm thời trang nữ.', 'https://example.com/images/cat_women.jpg', 2, TRUE, '2024-02-01 09:00:00', '2024-12-20 10:00:00', NULL),
    ('Áo Nam', 'ao-nam', 'Các loại áo dành cho nam giới.', 'https://example.com/images/cat_shirt_men.jpg', 1, TRUE, '2024-03-05 10:00:00', '2024-10-01 12:00:00', 1),
    ('Quần Nam', 'quan-nam', 'Các loại quần dành cho nam giới.', 'https://example.com/images/cat_pants_men.jpg', 2, TRUE, '2024-03-10 10:30:00', '2024-11-01 14:00:00', 1),
    ('Áo Nữ', 'ao-nu', 'Các loại áo dành cho nữ.', 'https://example.com/images/cat_shirt_women.jpg', 1, TRUE, '2024-04-01 09:00:00', '2025-01-01 09:00:00', 2),
    ('Quần Nữ', 'quan-nu', 'Các loại quần dành cho nữ.', 'https://example.com/images/cat_pants_women.jpg', 2, TRUE, '2024-04-15 10:00:00', '2025-02-01 10:00:00', 2),
    ('Áo Unisex', 'ao-unisex', 'Các loại áo unisex phù hợp cho cả nam và nữ.', 'https://example.com/images/cat_shirt_unisex.jpg', 3, TRUE, '2024-05-01 09:00:00', '2025-03-01 09:00:00', NULL),
    ('Quần Unisex', 'quan-unisex', 'Các loại quần unisex phù hợp cho cả nam và nữ.', 'https://example.com/images/cat_pants_unisex.jpg', 4, TRUE, '2024-05-10 10:00:00', '2025-04-01 10:00:00', NULL);

INSERT INTO wishlist (name, description, created_at, updated_at, customer_login)
VALUES
    ('Danh sách yêu thích của An', 'Những món quần áo An muốn mua trong mùa hè 2024.', '2024-01-10 09:00:00', '2024-06-10 10:00:00', 1),
    ('Wishlist của Bình', 'Sản phẩm Bình đang để ý trong bộ sưu tập xuân.', '2024-02-15 10:00:00', '2024-07-01 11:30:00', 2),
    ('Wishlist của Chi', 'Quần áo phong cách streetwear mà Chi yêu thích.', '2024-03-05 08:30:00', '2024-09-10 09:00:00', 3),
    ('Wishlist của Dũng', 'Áo thun và quần short Dũng thích.', '2024-04-12 14:00:00', '2024-09-15 14:10:00', 4),
    ('Danh sách mùa hè của Hương', 'Áo sơ mi và quần jeans.', '2024-05-20 10:00:00', '2024-12-01 10:15:00', 5),
    ('Yêu thích của Khánh', 'Các mẫu áo form rộng và quần baggy.', '2024-06-01 09:30:00', '2025-01-10 09:50:00', 6),
    ('Wishlist của Linh', 'Bộ sưu tập unisex phong cách năng động.', '2024-07-15 13:00:00', '2025-01-25 13:20:00', 7),
    ('Yêu thích của Minh', 'Các mẫu áo local brand mới ra.', '2024-09-01 08:00:00', '2025-03-10 09:00:00', 8),
    ('Wishlist của Nga', 'Áo sơ mi và quần tây thanh lịch.', '2024-10-10 09:30:00', '2025-04-05 09:45:00', 9),
    ('Wishlist của Phúc', 'Những sản phẩm hot trend năm 2025.', '2024-12-20 11:00:00', '2025-05-01 12:00:00', 10);

INSERT INTO wishlist_detail (note, created_at, wishlist_id, product_id)
VALUES
    ('Áo này form đẹp, nên mua.', '2024-01-10 09:10:00', 1, 1),
    ('Quần này phù hợp đi làm.', '2024-01-11 10:00:00', 1, 12),
    ('Áo thun màu trắng nhìn đơn giản.', '2024-01-12 08:45:00', 1, 3),
    ('Quần jeans xanh nhạt rất cá tính.', '2024-01-13 09:00:00', 1, 14),
    ('Áo polo cho mùa hè.', '2024-01-14 09:15:00', 1, 5),

    ('Áo sơ mi caro đẹp.', '2024-02-16 09:00:00', 2, 2),
    ('Quần jogger thể thao.', '2024-02-17 10:00:00', 2, 15),
    ('Áo hoodie oversize.', '2024-02-18 10:15:00', 2, 4),
    ('Áo thun unisex.', '2024-02-19 11:00:00', 2, 7),
    ('Quần short mùa hè.', '2024-02-20 08:30:00', 2, 11),

    ('Áo tank top năng động.', '2024-03-06 09:00:00', 3, 6),
    ('Áo sơ mi denim.', '2024-03-07 09:10:00', 3, 8),
    ('Quần jeans đen.', '2024-03-08 10:00:00', 3, 17),
    ('Áo len cổ tròn.', '2024-03-09 11:00:00', 3, 9),
    ('Quần kaki basic.', '2024-03-10 09:15:00', 3, 13),

    ('Áo khoác bomber.', '2024-04-13 09:20:00', 4, 10),
    ('Quần tây xám.', '2024-04-14 09:25:00', 4, 18),
    ('Áo polo xanh navy.', '2024-04-15 09:30:00', 4, 5),
    ('Áo sơ mi trắng.', '2024-04-16 10:00:00', 4, 2),
    ('Quần ống rộng.', '2024-04-17 10:15:00', 4, 19),

    ('Áo len cổ tim.', '2024-05-21 08:00:00', 5, 8),
    ('Áo phông đen.', '2024-05-22 09:00:00', 5, 4),
    ('Quần jeans slim fit.', '2024-05-23 10:00:00', 5, 14),
    ('Áo hoodie xám.', '2024-05-24 11:00:00', 5, 6),
    ('Quần short kaki.', '2024-05-25 12:00:00', 5, 16),

    ('Áo sơ mi cổ tàu.', '2024-06-02 09:00:00', 6, 3),
    ('Quần âu đen.', '2024-06-03 10:00:00', 6, 18),
    ('Áo vest blazer.', '2024-06-04 10:30:00', 6, 7),
    ('Áo len tay dài.', '2024-06-05 10:45:00', 6, 9),
    ('Quần tây slim.', '2024-06-06 11:00:00', 6, 20),

    ('Áo sơ mi ngắn tay.', '2024-07-16 08:30:00', 7, 1),
    ('Áo phông in chữ.', '2024-07-17 08:45:00', 7, 2),
    ('Quần kaki sáng.', '2024-07-18 09:00:00', 7, 13),
    ('Áo khoác bomber.', '2024-07-19 09:15:00', 7, 10),
    ('Quần jogger đen.', '2024-07-20 09:30:00', 7, 15),

    ('Áo phông local brand.', '2024-09-02 09:00:00', 8, 4),
    ('Áo sơ mi tay dài.', '2024-09-03 10:00:00', 8, 5),
    ('Áo hoodie trắng.', '2024-09-04 10:10:00', 8, 6),
    ('Quần short thể thao.', '2024-09-05 10:20:00', 8, 12),
    ('Quần jeans xám.', '2024-09-06 10:30:00', 8, 17),

    ('Áo khoác gió.', '2024-10-11 08:30:00', 9, 10),
    ('Áo phông pastel.', '2024-10-12 09:00:00', 9, 3),
    ('Quần jogger xanh.', '2024-10-13 09:10:00', 9, 15),
    ('Áo len đen.', '2024-10-14 09:20:00', 9, 8),
    ('Quần tây nâu.', '2024-10-15 09:30:00', 9, 18),

    ('Áo sơ mi vintage.', '2024-12-21 09:00:00', 10, 1),
    ('Áo thun cổ tròn.', '2024-12-22 10:00:00', 10, 4),
    ('Áo khoác jean.', '2024-12-23 10:15:00', 10, 10),
    ('Quần short jean.', '2024-12-24 10:30:00', 10, 11),
    ('Quần cargo đen.', '2024-12-25 11:00:00', 10, 19);

INSERT INTO orders (order_code, order_date, status_ordering, customer_trading_id)
VALUES
    ('ORD-2024-0001', '2024-02-15 09:32:00', 'PENDING', 1),
    ('ORD-2024-0002', '2024-05-10 14:20:00', 'CONFIRMED', 2),
    ('ORD-2024-0003', '2024-07-03 10:05:00', 'SHIPPING', 3),
    ('ORD-2024-0004', '2025-01-09 16:11:00', 'COMPLETED', 4),
    ('ORD-2025-0005', '2025-03-21 12:45:00', 'CANCELLED', 5),
    ('ORD-2025-0006', '2025-05-11 18:32:00', 'RETURNED', 6),
    ('ORD-2025-0007', '2025-06-30 11:22:00', 'PENDING', 7),
    ('ORD-2025-0008', '2025-07-19 09:05:00', 'CONFIRMED', 8),
    ('ORD-2025-0009', '2025-08-02 15:00:00', 'COMPLETED', 9),
    ('ORD-2025-0010', '2025-09-10 20:41:00', 'SHIPPING', 10);

--de them du lieu sau
INSERT INTO order_detail (product_name, quantity, unit_price, discount_percent, discount_amount, total_price, tax_rate, tax_amount, note, created_at, updated_at, order_id, product_id)
VALUES
    ('Áo thun cotton', 2, 200000, 10, 40000, 360000, 8, 28800, 'Giao trong tuần', '2024-02-15 09:35:00', '2024-02-16 10:00:00', 1, 1),
    ('Quần jean nam', 1, 450000, 0, 0, 450000, 8, 36000, 'Màu xanh navy', '2024-05-10 14:25:00', '2024-05-10 15:00:00', 2, 2),
    ('Áo sơ mi trắng', 3, 300000, 5, 45000, 855000, 8, 68400, '', '2024-07-03 10:05:00', '2024-07-03 10:05:00', 3, 3),
    ('Quần kaki nữ', 1, 380000, 0, 0, 380000, 8, 30400, 'Hàng giảm giá', '2025-01-09 16:11:00', '2025-01-09 16:11:00', 4, 4),
    ('Áo polo nam', 2, 250000, 15, 75000, 425000, 8, 34000, 'Combo mùa hè', '2025-03-21 12:45:00', '2025-03-21 12:45:00', 5, 5);

INSERT INTO customer_trading (receiver_name, receiver_phone, receiver_email, receiver_address, note, payment_method, total_amount, trading_date, created_at, updated_at)
VALUES
    ('Nguyễn Văn A', '0901234567', 'a@gmail.com', 'Hà Nội', 'Giao buổi sáng', 'CASH', 650000, '2024-02-15 09:00:00', '2024-02-15 09:00:00', '2024-02-15 09:00:00'),
    ('Trần Thị B', '0912345678', 'b@gmail.com', 'TP. HCM', 'Chuyển khoản', 'BANK_TRANSFER', 890000, '2024-05-10 14:00:00', '2024-05-10 14:00:00', '2024-05-10 14:00:00');

INSERT INTO invoice (invoice_code, issue_date, due_date, payment_date, payment_method, payment_status, subtotal_amount, discount_amount, tax_amount, total_amount, currency, created_by, created_at, updated_at, order_id)
VALUES
    ('INV-2024-0001', '2024-02-15 09:15:00', '2024-02-20 09:15:00', '2024-02-16 08:30:00', 'CASH', 'PAID', 600000, 0, 48000, 648000, 'VND', 'Admin', '2024-02-15 09:15:00', '2024-02-15 09:15:00', 1),
    ('INV-2024-0002', '2024-05-10 14:25:00', '2024-05-15 14:25:00', NULL, 'BANK_TRANSFER', 'UNPAID', 850000, 50000, 64000, 864000, 'VND', 'Admin', '2024-05-10 14:25:00', '2024-05-10 14:25:00', 2);
INSERT INTO customer (full_name, phone_number, email, gender, date_of_birth, create_at, update_at, status)
VALUES
    ('Nguyễn Văn A', '0901234567', 'nguyenvana@gmail.com', 'MALE', '1990-05-14', '2024-01-10', '2024-06-25', 'ACTIVE'),
    ('Trần Thị B', '0902345678', 'tranthib@gmail.com', 'FEMALE', '1993-11-22', '2024-02-18', '2024-12-03', 'ACTIVE'),
    ('Lê Văn C', '0903456789', 'levanc@gmail.com', 'MALE', '1988-09-10', '2024-03-05', '2025-01-22', 'INACTIVE'),
    ('Phạm Thị D', '0904567890', 'phamthid@gmail.com', 'FEMALE', '1995-02-25', '2024-04-09', '2024-11-14', 'ACTIVE'),
    ('Hoàng Minh E', '0905678901', 'hoangmine@gmail.com', 'MALE', '1992-03-18', '2024-05-12', '2025-02-19', 'ACTIVE'),
    ('Võ Thị F', '0906789012', 'vothif@gmail.com', 'FEMALE', '1998-07-01', '2024-06-20', '2025-03-08', 'ACTIVE'),
    ('Đỗ Văn G', '0907890123', 'dovang@gmail.com', 'MALE', '1987-12-11', '2024-07-07', '2025-01-11', 'INACTIVE'),
    ('Nguyễn Thị H', '0908901234', 'nguyenthih@gmail.com', 'FEMALE', '1991-06-04', '2024-08-15', '2025-04-23', 'ACTIVE'),
    ('Lý Anh I', '0909012345', 'lyanhi@gmail.com', 'OTHER', '2000-08-19', '2024-09-02', '2025-03-17', 'ACTIVE'),
    ('Trịnh Văn J', '0910123456', 'trinhvanj@gmail.com', 'MALE', '1985-10-23', '2024-09-25', '2025-05-11', 'INACTIVE'),
    ('Phan Thị K', '0911234567', 'phanthik@gmail.com', 'FEMALE', '1994-04-14', '2024-10-05', '2025-04-07', 'ACTIVE'),
    ('Ngô Văn L', '0912345678', 'ngovanl@gmail.com', 'MALE', '1996-01-29', '2024-10-29', '2025-05-30', 'ACTIVE'),
    ('Bùi Thị M', '0913456789', 'buithim@gmail.com', 'FEMALE', '1999-05-09', '2024-11-11', '2025-06-02', 'ACTIVE'),
    ('Trương Văn N', '0914567890', 'truongvann@gmail.com', 'MALE', '1983-03-17', '2024-12-18', '2025-01-08', 'INACTIVE'),
    ('Lâm Thị O', '0915678901', 'lamthio@gmail.com', 'FEMALE', '1997-12-08', '2025-01-06', '2025-04-01', 'ACTIVE'),
    ('Huỳnh Văn P', '0916789012', 'huynhvanp@gmail.com', 'MALE', '1989-11-03', '2025-02-10', '2025-06-10', 'ACTIVE'),
    ('Phạm Thị Q', '0917890123', 'phamthiq@gmail.com', 'FEMALE', '1992-02-27', '2025-03-14', '2025-07-20', 'INACTIVE'),
    ('Đinh Văn R', '0918901234', 'dinhvanr@gmail.com', 'MALE', '1990-09-15', '2025-04-19', '2025-08-25', 'ACTIVE'),
    ('Nguyễn Thị S', '0919012345', 'nguyenthis@gmail.com', 'FEMALE', '1995-06-12', '2025-05-25', '2025-09-14', 'ACTIVE'),
    ('Trần Văn T', '0920123456', 'tranvant@gmail.com', 'MALE', '1986-07-21', '2025-06-30', '2025-10-12', 'ACTIVE');





