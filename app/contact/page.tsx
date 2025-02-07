"use client"; // Required for Framer Motion animations in Next.js

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const MapComponent = dynamic(
  () => import('@/components/Map'), 
  { 
    ssr: false, // Disable SSR for this component
    loading: () => <p>Loading map...</p> // Optional loading component
  }
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you!</p>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Whether you have a question, feedback, or just want to say hello,
              we're here to help. Reach out to us using the information below.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">📞</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Phone</h3>
              <p className="text-gray-600">+959 972525008</p>
              <p className="text-gray-600">Mon - Fri, 9am - 5pm</p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">✉️</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Email</h3>
              <p className="text-gray-600">yewinhtut85@gmail.com</p>
              {/* <p className="text-gray-600">www.monisoft.com</p> */}
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">📍</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Address</h3>
              <p className="text-gray-600">
                No.2, First Floor, Corner Of Zawana Street And Thiri Khay Mar
                Street,
                <br />
                Zawana Ward,Thingangyun Township, Yangon, Myanmar
              </p>
            </motion.div>
          </div>
        </div>
        <div className="mx-10 my-14 pl-6">
          <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
            <MapComponent posix={[16.832005, 96.190731]} />
          </div>
        </div>
      </section>
    </div>
  );
}
