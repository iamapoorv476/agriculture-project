// import React, { useState } from 'react';
// import { cropImageUrls } from './CropImageUrls';

// // Crop database with realistic conditions
// const cropDatabase = [
//   { name: "Wheat", minTemp: 10, maxTemp: 25, minHumidity: 40, maxHumidity: 70, season: "Rabi" },
//   { name: "Rice", minTemp: 20, maxTemp: 35, minHumidity: 60, maxHumidity: 90, season: "Kharif" },
//   { name: "Maize", minTemp: 18, maxTemp: 27, minHumidity: 50, maxHumidity: 80, season: "Kharif" },
//   { name: "Sugarcane", minTemp: 20, maxTemp: 38, minHumidity: 60, maxHumidity: 85, season: "Annual" },
//   { name: "Cotton", minTemp: 21, maxTemp: 30, minHumidity: 40, maxHumidity: 70, season: "Kharif" },
//   { name: "Turmeric", minTemp: 20, maxTemp: 30, minHumidity: 70, maxHumidity: 90, season: "Kharif" },
//   { name: "Tea", minTemp: 15, maxTemp: 30, minHumidity: 60, maxHumidity: 90, season: "Annual" },
//   { name: "Coffee", minTemp: 18, maxTemp: 28, minHumidity: 60, maxHumidity: 80, season: "Annual" },
//   { name: "Barley", minTemp: 12, maxTemp: 25, minHumidity: 30, maxHumidity: 60, season: "Rabi" },
//   { name: "Millets", minTemp: 20, maxTemp: 35, minHumidity: 40, maxHumidity: 70, season: "Kharif" }
// ];

// // Improved recommendation logic
// const getCropRecommendation = (temperature, humidity) => {
//   const month = new Date().getMonth() + 1;
//   let season = "";

//   if (month >= 6 && month <= 9) season = "Kharif"; // June–Sept
//   else if (month >= 10 || month <= 3) season = "Rabi"; // Oct–March
//   else season = "Annual";

//   // Score crops instead of strict filtering
//   const scoredCrops = cropDatabase.map(crop => {
//     let score = 0;

//     if (temperature >= crop.minTemp - 2 && temperature <= crop.maxTemp + 2) score++;
//     if (humidity >= crop.minHumidity - 10 && humidity <= crop.maxHumidity + 10) score++;
//     if (crop.season === season || crop.season === "Annual") score++;

//     return { ...crop, score };
//   });

//   const maxScore = Math.max(...scoredCrops.map(c => c.score));
//   const recommended = scoredCrops
//     .filter(c => c.score === maxScore && c.score > 1)
//     .map(c => c.name);

//   return recommended.length > 0
//     ? recommended
//     : ["No suitable crop found for current conditions"];
// };

// const CropRecommender = () => {
//   const [city, setCity] = useState('');
//   const [recommendationData, setRecommendationData] = useState(
//     'Enter a city and click "Recommend Crops".'
//   );

//   const getRecommendation = async () => {
//     if (!city) {
//       setRecommendationData('Please enter a city name.');
//       return;
//     }

//     setRecommendationData('Loading...');

//     const apiKey = '39a641d8c7c530d197d33cc2a57d3669'; // Replace with your key or env variable
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();

//       if (data.cod !== 200) {
//         setRecommendationData('City not found or error fetching weather data.');
//         return;
//       }

//       const temperature = data.main.temp;
//       const humidity = data.main.humidity;
//       const description = data.weather[0].description.toLowerCase();
//       const cityName = data.name;
//       const countryName = data.sys.country;

//       const recommendedCrops = getCropRecommendation(temperature, humidity);
//       const displayedCrops = recommendedCrops.slice(0, 3);

//       setRecommendationData(
//         <div className="space-y-4 animate-fade-in">
//           <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-500">
//             <p className="text-gray-700 mb-2">
//               <span className="font-semibold text-green-700">City:</span> {cityName}, {countryName}
//             </p>
//             <p className="text-xl font-bold text-green-800 bg-green-100 p-3 rounded-lg text-center border border-green-200">
//               <span className="font-semibold text-green-600">Recommended Crops:</span>{" "}
//               {displayedCrops.join(", ")}
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
//               <p className="text-blue-800"><span className="font-semibold">Temperature:</span></p>
//               <p className="text-2xl font-bold text-blue-600">{temperature} °C</p>
//             </div>
//             <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 text-center">
//               <p className="text-cyan-800"><span className="font-semibold">Humidity:</span></p>
//               <p className="text-2xl font-bold text-cyan-600">{humidity}%</p>
//             </div>
//             <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
//               <p className="text-purple-800"><span className="font-semibold">Weather:</span></p>
//               <p className="text-lg font-semibold text-purple-600 capitalize">{description}</p>
//             </div>
//           </div>

//           {/* Crop images */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//             {displayedCrops.map(crop => (
//               <div key={crop} className="flex flex-col items-center">
//                 <img
//                   src={cropImageUrls[crop] || ""}
//                   alt={crop}
//                   className="w-full max-w-sm h-48 object-cover rounded-2xl shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
//                 />
//                 <p className="mt-2 font-semibold text-green-700">{crop}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       setRecommendationData('Error fetching weather data.');
//     }
//   };

//   const isLoading = recommendationData === 'Loading...';
//   const isError = typeof recommendationData === 'string' && (
//     recommendationData.includes('Error') ||
//     recommendationData.includes('City not found') ||
//     recommendationData.includes('Please enter')
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//             </svg>
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
//             CROP RECOMMENDATION
//           </h2>
//           <p className="text-gray-600 text-lg">Discover the perfect crops for your location</p>
//         </div>

//         {/* Input Section */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 border border-white/20">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <input
//               type="text"
//               placeholder="Enter City Name"
//               value={city}
//               onChange={(e) => setCity(e.target.value)}
//               className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 text-lg"
//               onKeyPress={(e) => e.key === 'Enter' && getRecommendation()}
//             />
//             <button
//               onClick={getRecommendation}
//               disabled={isLoading}
//               className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 focus:ring-4 focus:ring-green-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
//             >
//               {isLoading ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Loading...
//                 </div>
//               ) : (
//                 'Recommend Crops'
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Results Section */}
//         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 min-h-[200px]">
//           <div id="recommendation-data" className="flex items-center justify-center min-h-[150px]">
//             {isError ? (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
//                   <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                 </div>
//                 <p className="text-red-600 font-semibold text-lg">{recommendationData}</p>
//               </div>
//             ) : isLoading ? (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//                   <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//                 <p className="text-blue-600 font-semibold text-lg">{recommendationData}</p>
//               </div>
//             ) : typeof recommendationData === 'string' ? (
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
//                   <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <p className="text-gray-600 text-lg font-medium">{recommendationData}</p>
//               </div>
//             ) : (
//               recommendationData
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CropRecommender;
