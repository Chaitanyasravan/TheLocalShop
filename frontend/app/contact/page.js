'use client';

import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted:', formData);
        setSubmitted(true);
        // Integrate API call here for submitting formData to backend
        // Example: await api.post('/api/contact', formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

                <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    {submitted ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4 text-green-600">Thank you!</h2>
                            <p className="text-gray-700">Your message has been submitted successfully. We will get back to you soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Write your message here..."
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
