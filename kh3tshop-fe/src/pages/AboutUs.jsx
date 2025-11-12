import React from "react";
import { Users, Quote, Heart, MapPin } from "lucide-react";

// Component About được thiết kế theo phong cách và cấu trúc của Home.jsx, đảm bảo Responsive
const About = () => {
  // Nội dung và URLs ảnh giữ nguyên
  const mainImage = "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HNeRVRtdKo/ro8tstmc_expires_30_days.png";
  const image2 = "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HNeRVRtdKo/snemmikh_expires_30_days.png";
  const image3 = "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HNeRVRtdKo/bjgvevvn_expires_30_days.png";
  const image4 = "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HNeRVRtdKo/kf8cmzpl_expires_30_days.png";
  const founderImage = "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HNeRVRtdKo/psd7wc8r_expires_30_days.png";

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* KH3T Header */}
        <header className="text-center mb-20">
          <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-900 tracking-tighter">
            KH3T
          </h1>
          <p className="text-xl text-gray-500 mt-2 flex items-center justify-center">
            KH3T Studio is the rising Local Brand beloved by youth, a statement of youthfulness, freedom, and disruptive style. 
            <br />KH3T Studio encourages you to express your strong self through unique, creative designs. Choose KH3T to "live your truth" through fashion and define your own identity!
          </p>
        </header>

        {/* --- Section 1: Vision and Quotes --- */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Column 1: Image and Origin */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl group transition-all duration-500 hover:scale-[1.01]">
            <img
              src={mainImage}
              alt="Fashion inspiration"
              className="w-full h-[500px] object-cover"
            />
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity"></div>
            
            {/* Est 2025 */}
            <span className="absolute top-6 left-6 text-2xl font-bold text-white tracking-widest bg-black/60 px-3 py-1 rounded-lg">
              Est 2025
            </span>
            
            {/* Origin Text */}
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl">
              <p className="text-gray-900 font-semibold text-base sm:text-lg">
                <MapPin className="inline w-5 h-5 mr-1 text-red-500" /> From Viet Nam
              </p>
              <p className="text-gray-700 text-sm mt-1">
                We are inspired by many things and we will turn it into the best products.
              </p>
            </div>
          </div>

          {/* Column 2: Mission and Quotes */}
          <div className="flex flex-col space-y-8 pt-8 lg:pt-0">
            <div className="p-6 bg-gray-50 rounded-xl shadow-md border-t-4 border-gray-900">
                <p className="text-lg font-medium text-gray-700 italic">
                    <Quote className="inline w-5 h-5 mr-2 text-red-500" />
                    "We focus on high quality products that are in line with modern trends for potential and intelligent customers."
                </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl shadow-md border-t-4 border-gray-700">
                <p className="text-lg font-medium text-gray-700 italic">
                    <Quote className="inline w-5 h-5 mr-2 text-red-500" />
                    "We bring the most trendy, luxurious and fashionable."
                </p>
            </div>

            <div className="p-6 bg-gray-200 rounded-xl shadow-md border-t-4 border-gray-500">
                <p className="text-lg font-medium text-gray-700 italic">
                    <Quote className="inline w-5 h-5 mr-2 text-red-500" />
                    "Fashion is closely linked to life and life must have fashion as a highlight."
                </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: Product Showcase (The 3 Images) --- */}
        <section className="mb-40">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">OUR STORE VIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Image Block 1 */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src={image2} alt="Fashion product shot 1" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <span className="text-white text-xl font-bold">LUXURY</span>
              </div>
            </div>

            {/* Image Block 2 */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src={image3} alt="Fashion product shot 2" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <span className="text-white text-xl font-bold">TRENDY</span>
              </div>
            </div>

            {/* Image Block 3 */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img src={image4} alt="Fashion product shot 3" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-300">
                <span className="text-white text-xl font-bold">FASHIONABLE</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: Founder and Mantra --- */}
        <section className="relative shadow-2xl mb-40">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">OUR SLOGAN FROM KH3T</h2>
         <img
					src={"https://storage.googleapis.com/tagjs-prod.appspot.com/v1/HNeRVRtdKo/z7lh1481_expires_30_days.png"} 
					className="self-stretch h-[500px] object-fill"
				/>
        </section>
        
      </div>
    </div>
  );
};

export default About;