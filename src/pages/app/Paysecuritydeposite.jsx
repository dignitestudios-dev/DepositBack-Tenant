import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';
import Stripe from "../../assets/addproperty/Stripe.png";
import { ImCross } from 'react-icons/im';
import Footer from '../../components/global/Footer';
import Header from '../../components/global/Header';

const Paysecuritydeposite = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [stripeDetails, setStripeDetails] = useState({
        cardHolderName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const [addedCard, setAddedCard] = useState(null); // State for storing the added card

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStripeDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleStripeAccountSubmit = () => {
        setAddedCard(stripeDetails.cardNumber); // Store the card number in state
        setIsModalOpen(false); // Close modal after account is added
        console.log("Stripe account added:", stripeDetails);
    };

    return (
        <>
        <Header/>

          <div className="min-h-screen bg-[#F3F8FF] p-10 rounded-2xl ">
            <div className="text-left mb-8 max-w-[1260px] mx-auto pt-0">
                <div className='flex gap-3 items-center'>
                    <button type="button" onClick={() => navigate(-1)} >
                        <FaArrowLeft size={18} className='mb-2' />
                    </button>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                        Pay Security Deposit
                    </h1>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                    This property requires a deposit of $1500. The deposit will not be deducted until the landlord approves your request to rent this property. The deposit will be securely held in escrow and refunded at the end of your agreement, less any deductions for damages or unpaid rent.
                </p>
            </div>

            <div className="bg-white rounded-lg flex justify-center shadow-sm w-full mx-auto max-w-[1260px]  p-8">
                <div className="space-y-6 max-w-md w-full">
                    {/* Only show the Add Stripe Account field if no card is added */}
                    {!addedCard && (
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-3">
                                Add Stripe Account
                            </label>

                            <div className="w-full">
                                <div
                                    className="p-3 mt-2 border rounded-2xl font-[500] bg-[#F0F4FF] flex justify-between items-center cursor-pointer"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <div className="flex items-center gap-2">
                                        <img src={Stripe} alt="Stripe" className="h-6" />
                                        <p className='text-sm'>Stripe</p>
                                    </div>
                                    <div className="text-sm"><FaChevronRight /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Display added Stripe account info */}
                    {addedCard && (
                        <div className="p-3 mt-2 border rounded-2xl font-[500] bg-[#F0F4FF] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <img src={Stripe} alt="Stripe" className="h-6" />
                                <p className="text-sm">**** **** **** {addedCard.slice(-4)}</p> {/* Display last 4 digits */}
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-0">
                        <button
                            className={`flex-1 py-3 px-6 text-white font-medium rounded-full transition-colors ${addedCard ? 'bg-[#003897] hover:bg-blue-700' : 'bg-[#BCBCBC]'}`}
                            disabled={!addedCard}
                            onClick={() => {
                                navigate("/app/tentant-account-status")
                            }}
                        >
                            Pay Deposit
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal for Stripe Account Details */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[30em]">
                        <div className='flex justify-between items-center mb-2'>
                            <h3 className="text-[23px] font-semibold ">Add Stripe Account</h3>
                            <ImCross className='cursor-pointer' onClick={() => setIsModalOpen(false)} />
                        </div>
                        <p className='text-[14px] pb-4'>Enter your payment details to securely process the deposit for this property. Stripe ensures your data is encrypted and safe.</p>
                        <label className="block text-sm font-[500] text-black pb-1">Card Holder Name</label>
                        <input
                            type="text"
                            name="cardHolderName"
                            className="w-full p-2 rounded-full border bg-[#ECECEC] border-gray-300 mb-4"
                            value={stripeDetails.cardHolderName}
                            onChange={handleInputChange}
                        />
                        <label className="block text-sm font-[500] text-black pb-1">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            className="w-full p-2 rounded-full border bg-[#ECECEC] border-gray-300 mb-4"
                            value={stripeDetails.cardNumber}
                            onChange={handleInputChange}
                        />
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-sm font-[500] text-black pb-1">Expiry</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    className="w-full p-2 rounded-full border bg-[#ECECEC] border-gray-300 mb-4"
                                    value={stripeDetails.expiry}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-[500] text-black pb-1">CVC</label>
                                <input
                                    type="text"
                                    name="cvc"
                                    className="w-full p-2 rounded-full border bg-[#ECECEC] border-gray-300 mb-4"
                                    value={stripeDetails.cvc}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleStripeAccountSubmit}
                                className="py-2 px-4 text-sm font-[500] w-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white rounded-full"
                            >
                                Add Stripe Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <Footer/>
        
        </>
      
    );
};

export default Paysecuritydeposite;
