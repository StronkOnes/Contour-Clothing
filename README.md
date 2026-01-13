<div align="center">
<img width="1200" height="475" alt="Contour Worldwide Clothing Store" src="public/WebImages/Hero.jpeg" />
</div>

# Contour Worldwide Clothing Store

This is an e-commerce website for Contour Worldwide, a clothing brand targeting Gen Z and individuals aged 25-40 with high-quality, comfortable, and stylish t-shirts, hoodies, and sweaters.

## Features

- Modern e-commerce interface with product listings
- Shopping cart functionality
- Secure payment processing via Yoco
- Customer name and email collection
- Email marketing consent option
- Admin dashboard to track sales and customer information
- Dark/light mode toggle

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Payment Processing

The store uses Yoco for secure payment processing. When customers proceed to checkout, they are redirected to the secure Yoco payment portal at https://pay.yoco.com/contour-worldwide.

Customer information (name, email) and email marketing consent are captured and stored in the database for administrative purposes.

## Admin Portal

Access the admin portal by navigating to the admin section of the website. The admin dashboard shows:
- Total sales
- Total orders
- Email subscribers count
- Email consent rate
- Recent orders with customer details
