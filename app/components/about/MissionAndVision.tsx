const MissionAndVision = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 max-w-7xl mx-auto  lg:px-8 pb-10 lg:pb-15">
      <div id="vision" className="vision">
        <h3 className="uppercase text-xl font-bold mb-6">Our Vision</h3>
        <div className="space-y-6 mb-10">
          <p className="text-base leading-7.5 lg:leading-8">
            Our vision is simple: to be the most trusted and innovative real estate company in Nigeria, recognised for our commitment to delivering high-quality properties at fair prices, ensuring full transparency, and providing unmatched customer service. We aim to make property transactions easier, more accessible, and more reliable for Nigerians at home and abroad.
          </p>
          <p className="text-base leading-7.5 lg:leading-8">
            We are committed to building a reputation that speaks to the values we hold dear: trust, transparency, quality, and customer satisfaction. Whether you are a first-time buyer, an investor, or someone looking to lease or manage property, we are dedicated to providing you with the resources and support to make informed decisions every step of the way.
          </p>
        </div>
        <h1 className='lg:text-[26px] text-3xl uppercase font-serif lg:whitespace-nowrap'>"Trust. Quality. Transparency"</h1>
      </div>
      
      <div id="mission" className="mission">
        <h3 className="uppercase text-xl font-bold mb-6">Our Mission</h3>
        <div className="space-y-6">
          <p className="text-base leading-7.5 lg:leading-8">
            At Rheel Estate Limited, our mission is to redefine real estate in Nigeria by providing a transparent, secure, and customer-focused property experience. We are committed to helping individuals and businesses buy, sell, lease, and manage properties with ease and confidence, whether they are in Nigeria or abroad.
          </p>
          <p className="text-base leading-7.5 lg:leading-8">
            Through integrity, innovation, and excellence, we aim to bridge the gap between property owners, buyers, and investors, ensuring seamless transactions, fair pricing, and high-quality developments. We also strive to make a positive impact in people's lives by empowering Nigerians with financial opportunities through our affiliate program and by developing well-built, modern homes that offer true value.
          </p>
          <p className="text-base leading-7.5 lg:leading-8">
            At Rheel Estate, we don't just sell properties—we build trust, create opportunities, and shape the future of real estate in Nigeria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;