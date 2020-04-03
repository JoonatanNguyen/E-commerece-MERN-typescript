-- Users table 

CREATE TABLE users
( 
  id serial PRIMARY KEY,
  username varchar NOT NULL,
  password varchar NOT NULL,
  first_name varchar NOT NULL,
  last_name varchar NOT NULL,
  email varchar NOT NULL,
  is_admin boolean
)

-- Products table

CREATE TABLE products
(
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  short_description varchar, 
  long_description varchar, 
  categories varchar [] NOT NULL,
  price numeric (5,2) NOT NULL
)

-- Shopping cart table
                                                                                                                                                                                medias text []);
CREATE TABLE shoppingCart
(
  id serial not null PRIMARY KEY,
  product_id int NOT NULL references products(id),
  variant_id int NOT NULL references variants(id),
  quantity int,
  user_id int NOT NULL references users(id)
)

-- Variant table 

CREATE TABLE variants
(
  id serial not null PRIMARY KEY,
  color varchar(20) not null,
  image text [], 
  color_specification varchar (20)
)

-- Product variant table

CREATE TABLE productVariant
(
  product_id int not null references products(id),
  variant_id int not null references variants(id)
)

-- Queries for products

-- Get all products
SELECT * from products

-- Find product by productId 
SELECT * from products WHERE id = prodctId

-- Update product detail
UPDATE products
SET name = 'New Name',
    short_description = 'New short description'
WHERE id = productId

-- Create product 
-- For one product:
INSERT INTO products(name, short_description, long_description, categories, price, medias) 
VALUES 
('Beosound Balance', 'Innovative, wireless home speaker', 'This will be a longer description for the speaker', ARRAY ['Speakers'], 220.43, ARRAY ['https://imageSource1'])

INSERT INTO variants(color, image, color_specification) 
VALUES ('Dark oak', ARRAY ['https://imageSource2'], '#000000')

INSERT INTO productVariant(product_id, variant_id) 
VALUES (3, 1)

-- For second product:
INSERT INTO products(name, short_description, long_description, categories, price, medias) 
VALUES 
('Beosound Sharp', 'Wall home speaker', 'This will be a longer description for the speaker', ARRAY ['Speakers'], 450.43, ARRAY ['https://imageSource11'])

INSERT INTO variants(color, image, color_specification) 
VALUES ('Dark oak', ARRAY ['https://imageSource22'], '#000000')

INSERT INTO productVariant(product_id, variant_id) 
VALUES (4, 2)

-- Delete product
DELETE FROM products WHERE id = productId 


-- Queries for users

-- Get all users
SELECT * FROM users

-- Signup 
INSERT INTO users(username, password, first_name, last_name, email, is_admin) 
VALUES ('Bearie', '13hdwerq234rbq3gd62tqg23iuh1834r', 'bear', 'awesome', 'bearie.awesome@gmail.com', true)

-- Find user by userId
SELECT * FROM users WHERE id = userId

-- Update user detail
UPDATE users 
SET username = 'new username',
    emai = 'new email'
WHERE id = userId

-- Change password
SELECT password, email FROM users WHERE id = userId
UPDATE users 
SET password = 'newPassword'
WHERE id = userId

-- Delete user
SELECT is_admin FROM users WHERE id = userId
DELETE FROM users WHERE id = userId

-- Queries for shopping cart
-- Get all cart products
SELECT p.name, p.price, v.color, s.quantity 
FROM products p 
INNER JOIN shoppingCart s ON p.id = s.product_id 
INNER JOIN variants v ON v.id = s.variant_id  
INNER JOIN users u ON u.id = s.user_id

-- Add to cart 
INSERT INTO shoppingCart(product_id, variant_id, quantity, user_id)
VALUES (3, 1, 2, 1)

-- Increase quantity / Decrease quantity
UPDATE shoppingCart
SET quantity = 1
WHERE product_id = productId 
AND variant_id = variantId 
AND user_id = userId
