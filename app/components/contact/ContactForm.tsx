import React from 'react';

const ContactForm = () => {
  return (
    <form className="max-w-3xl ">
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
            placeholder="Your name" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
        
        <div className="form-group flex flex-col w-full">
          <label htmlFor="email" className="text-sm font-semibold text-[#161E2D] mb-2">Email address</label>
          <input 
            type="email" 
            id="email"
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
            placeholder="Phone Numbers:" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
        
        <div className="form-group flex flex-col w-full">
          <label htmlFor="subject" className="text-sm font-semibold text-[#161E2D] mb-2">Subject</label>
          <input 
            type="text" 
            id="subject"
            placeholder="Enter Keyword" 
            className="border border-[#E4E4E4] placeholder:text-sm p-3 rounded-full outline-none" 
          />
        </div>
      </div>
      
      <div className="form-group flex flex-col mb-5">
        <label htmlFor="message" className="text-sm font-semibold text-[#161E2D] mb-2">Your Message</label>
        <textarea 
          id="message"
          placeholder="Your Message" 
          className="p-4 border border-[#E4E4E4] rounded-lg outline-none h-35"
        ></textarea>
      </div>
      
      <button type="submit" className="w-full text-white bg-[#0A2F1E] p-4 rounded-full font-medium">Send Message</button>
    </form>
  );
}

export default ContactForm;