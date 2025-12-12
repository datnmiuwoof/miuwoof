// import React, { useState } from 'react';
// import { CreditCard, Lock } from 'lucide-react';

// export default function BankCard() {
//     const [formData, setFormData] = useState({
//         cardNumber: '',
//         cardHolder: '',
//         expiryDate: '',
//         cvv: ''
//     });
//     const [isFlipped, setIsFlipped] = useState(false);

//     const handleChange = (e: any) => {
//         const { name, value } = e.target;
//         let formattedValue = value;

//         if (name === 'cardNumber') {
//             // Chỉ cho phép số và format xxxx xxxx xxxx xxxx
//             formattedValue = value.replace(/\s/g, '').replace(/\D/g, '').slice(0, 16);
//             formattedValue = formattedValue.match(/.{1,4}/g)?.join(' ') || formattedValue;
//         } else if (name === 'expiryDate') {
//             // Format MM/YY
//             formattedValue = value.replace(/\D/g, '').slice(0, 4);
//             if (formattedValue.length >= 3) {
//                 formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
//             }
//         } else if (name === 'cvv') {
//             formattedValue = value.replace(/\D/g, '').slice(0, 3);
//         } else if (name === 'cardHolder') {
//             formattedValue = value.toUpperCase();
//         }

//         setFormData(prev => ({ ...prev, [name]: formattedValue }));
//     };

//     const handleCvvFocus = () => setIsFlipped(true);
//     const handleCvvBlur = () => setIsFlipped(false);

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
//             <div className="w-full max-w-md">
//                 {/* Card Display */}
//                 <div className="perspective mb-8">
//                     <div
//                         className={`relative w-full h-56 transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
//                     >
//                         {/* Front of Card */}
//                         <div className="absolute inset-0 backface-hidden">
//                             <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl p-6 flex flex-col justify-between">
//                                 <div className="flex justify-between items-start">
//                                     <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded opacity-80"></div>
//                                     <CreditCard className="text-white opacity-70" size={40} />
//                                 </div>

//                                 <div className="space-y-4">
//                                     <div className="text-white text-xl tracking-widest font-mono">
//                                         {formData.cardNumber || '•••• •••• •••• ••••'}
//                                     </div>

//                                     <div className="flex justify-between items-end">
//                                         <div>
//                                             <div className="text-gray-400 text-xs mb-1">Card Holder</div>
//                                             <div className="text-white font-semibold">
//                                                 {formData.cardHolder || 'YOUR NAME'}
//                                             </div>
//                                         </div>
//                                         <div>
//                                             <div className="text-gray-400 text-xs mb-1">Expires</div>
//                                             <div className="text-white font-semibold">
//                                                 {formData.expiryDate || 'MM/YY'}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Back of Card */}
//                         <div className="absolute inset-0 backface-hidden rotate-y-180">
//                             <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden">
//                                 <div className="w-full h-12 bg-gray-950 mt-6"></div>
//                                 <div className="p-6">
//                                     <div className="bg-gray-700 h-10 rounded flex items-center justify-end px-4">
//                                         <div className="text-black bg-white px-3 py-1 rounded font-mono font-bold">
//                                             {formData.cvv || '•••'}
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2 mt-4 text-gray-400 text-xs">
//                                         <Lock size={12} />
//                                         <span>Secured by your bank</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <div className="bg-white rounded-2xl shadow-2xl p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Card Details</h2>

//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Card Number
//                             </label>
//                             <input
//                                 type="text"
//                                 name="cardNumber"
//                                 value={formData.cardNumber}
//                                 onChange={handleChange}
//                                 placeholder="1234 5678 9012 3456"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Card Holder
//                             </label>
//                             <input
//                                 type="text"
//                                 name="cardHolder"
//                                 value={formData.cardHolder}
//                                 onChange={handleChange}
//                                 placeholder="NGUYEN VAN A"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                             />
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Expiry Date
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="expiryDate"
//                                     value={formData.expiryDate}
//                                     onChange={handleChange}
//                                     placeholder="MM/YY"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     CVV
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="cvv"
//                                     value={formData.cvv}
//                                     onChange={handleChange}
//                                     onFocus={handleCvvFocus}
//                                     onBlur={handleCvvBlur}
//                                     placeholder="123"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
//                                 />
//                             </div>
//                         </div>

//                         <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition">
//                             Submit Payment
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <style jsx>{`
//         .perspective {
//           perspective: 1000px;
//         }
//         .transform-style-3d {
//           transform-style: preserve-3d;
//         }
//         .backface-hidden {
//           backface-visibility: hidden;
//         }
//         .rotate-y-180 {
//           transform: rotateY(180deg);
//         }
//       `}</style>
//         </div>
//     );
// }