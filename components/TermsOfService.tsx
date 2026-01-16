import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="pt-32 pb-24 container mx-auto px-6 bg-white dark:bg-black relative z-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-display font-bold uppercase mb-12 leading-none">Terms and Conditions of Sale</h1>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p><strong>Last Updated:</strong> January 2026</p>
          <p>These Terms and Conditions govern the sale of apparel (including hoodies and t-shirts) by Sipho Ndala trading as Contour Worldwide.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Agreement of Sale</h2>
          <p>An agreement of sale only comes into effect if and when a credit card authorization is received from Yoco or an EFT reflects in our bank account.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Pricing</h2>
          <p>All prices are displayed in South African Rand (ZAR). We reserve the right to cancel orders arising from pricing errors caused by technical malfunctions.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Availability</h2>
          <p>Stock of all goods is limited. Contour Worldwide will make all reasonable efforts to monitor stock levels. Should an item be sold out after an order is placed, we will notify you and offer a full refund.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Delivery</h2>
          <p>We utilize The Courier Guy, Pudo, and Aramex for deliveries. While we strive for timely delivery, we are not liable for delays caused by third-party couriers once the parcel has left our premises in Olifantsfontein.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Shipping & Delivery Policy</h2>
          <p><strong>Standard Delivery:</strong> We offer door-to-door delivery via our preferred courier partners.</p>
          <p><strong>Fulfillment Time:</strong> Orders are processed within 1-3 business days.</p>
          <p><strong>Tracking:</strong> Once your order has been dispatched, a tracking number will be sent to [Customer Email].</p>
          <p><strong>Risk:</strong> Risk in the products shall pass to you or your representative upon delivery at the address provided.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Returns & Exchanges Policy</h2>
          <p>We want you to be satisfied with your purchase. If you are not, you may return your product under the following conditions:</p>
          <ul className="list-disc list-inside">
            <li><strong>Cooling-Off Period:</strong> In terms of the ECT Act, you have a 7-day window from receipt of goods to cancel your purchase for a full refund (excluding original shipping costs).</li>
            <li><strong>Standard Returns:</strong> We accept returns within 14 days of delivery, provided the item is unworn, unwashed, and in its original packaging with all tags attached.</li>
            <li><strong>Shipping Costs:</strong> For "change of mind" or size exchanges, the Customer is responsible for the shipping costs associated with returning the item to us and the cost of sending the replacement.</li>
            <li><strong>Defective Goods:</strong> If a product is defective (e.g., poor stitching or print damage), we will arrange a collection and replacement at our expense, in accordance with the Consumer Protection Act.</li>
            <li><strong>Exclusions:</strong> For hygiene reasons, items that have been worn or washed cannot be returned.</li>
          </ul>

          <h2 className="text-2xl font-bold uppercase mt-8">Intellectual Property Policy</h2>
          <p>All content included on the Contour Worldwide website, such as t-shirt designs, hoodie graphics, logos, images, and text, is the property of Sipho Ndala and is protected by South African and international copyright laws.</p>
          <p>You may not reproduce, duplicate, copy, or sell any portion of our designs or brand identity without express written permission from us.</p>

          <h2 className="text-2xl font-bold uppercase mt-8">Limitation of Liability</h2>
          <p>Contour Worldwide and Sipho Ndala shall not be liable for any direct, indirect, or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products, even if we have been advised of the possibility of such damages.</p>
          <p>While we use high-quality materials, we are not responsible for damage caused by improper garment care (e.g., bleaching, high-heat ironing on prints). Please follow the care instructions on the garment label.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;