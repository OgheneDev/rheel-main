'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      Swal.fire({
        title: "Warning!",
        text: `Please fill in all fields before submitting.`,
        icon: "warning"
      });
      return;
    }

    setLoading(true); // Start loading state

    const serviceId = 'service_q89cnsr'; // Replace with your EmailJS service ID
    const templateId = 'template_vpcvjpc'; // Replace with your EmailJS template ID
    const userId = 'd-Ir5APRYvIMx9yz9'; // Replace with your EmailJS user ID

    // Compose a comprehensive message with all form fields
    const emailMessage = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    const templateParams = {
      message: emailMessage
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success"
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }); // Clear the form
      })
      .catch((error) => {
        console.error('FAILED...', error);
        Swal.fire({
          title: "Failed!",
          text: "Failed to send your message. Please try again later.",
          icon: "error"
        });
      })
      .finally(() => {
        setLoading(false); // End loading state
      });
  };

  return (
    <form className="max-w-3xl" onSubmit={handleSubmit}>
      <article className="mb-6">
        <h3 className="text-2xl font-semibold text-[#161E2D] mb-2">Drop Us A Line</h3>
        <p className="text-sm text-[#5C6368] mb-5">Feel free to connect with us through our online channels for updates, news, and more.</p>
      </article>
      
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="form-group flex flex-col w-full">
          <label htmlFor="name" className="text-sm font-semibold text-[#161E2D] mb-2">Your name</label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
        
        <div className="form-group flex flex-col w-full">
          <label htmlFor="email" className="text-sm font-semibold text-[#161E2D] mb-2">Email address</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        <div className="form-group flex flex-col w-full">
          <label htmlFor="phone" className="text-sm font-semibold text-[#161E2D] mb-2">Phone Numbers</label>
          <input 
            type="text" 
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Numbers:" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
        
        <div className="form-group flex flex-col w-full">
          <label htmlFor="subject" className="text-sm font-semibold text-[#161E2D] mb-2">Subject</label>
          <input 
            type="text" 
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter Keyword" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
      </div>
      
      <div className="form-group flex flex-col mb-5">
        <label htmlFor="message" className="text-sm font-semibold text-[#161E2D] mb-2">Your Message</label>
        <textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message" 
          className="p-4 border border-[#E4E4E4] rounded-lg outline-none h-35"
        ></textarea>
      </div>
      
      <button 
        type="submit" 
        className="w-full text-white bg-[#0A2F1E] cursor-pointer p-4 rounded-full font-medium"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;