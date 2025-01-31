"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
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
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Our mission, vision, and values</p>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Our Products
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We build Hotel Management Software, Restaurant Management
              Software, Inventory Management Software , Car Show Room Finance
              System, Health Care Solutions, Accounting Management Software
              ,etc...
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To empower businesses and individuals with innovative technology
                solutions that drive growth, efficiency, and success.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be a global leader in technology innovation, creating a
                positive impact on the world through our products and services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg">
              These are the principles that guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">🤝</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                User Frently
              </h3>
              <p className="text-gray-600">
                One Time Learning And Never Forgotting How To Use Our Product
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">💪</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                All In One Solutions
              </h3>
              <p className="text-gray-600">
                Our Software Contain All Module That Will Need To Use In A
                Business
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">🔢</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Up To Date
              </h3>
              <p className="text-gray-600">
                We alway researching and developing our products with
                cutting-edge techonology
              </p>
            </motion.div>
            {/* Value 4 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">🌍</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Accessibility
              </h3>
              <p className="text-gray-600">
                If you are a owner of a business, You Can Check Your Income And
                Expend From Anywhere
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section 
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Team</h2>
            <p className="text-gray-600 text-lg">
              Meet the talented individuals behind our success.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full"></div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full"></div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Jane Smith
              </h3>
              <p className="text-gray-600">CTO</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full"></div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                Mike Johnson
              </h3>
              <p className="text-gray-600">Lead Developer</p>
            </motion.div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
