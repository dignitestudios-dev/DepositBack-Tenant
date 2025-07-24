import React, { useState } from 'react';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import invoice from "../../assets/invoice.png";
import { useLocation } from 'react-router';
import { TiWarning } from 'react-icons/ti';
import { IoMdCheckmark } from 'react-icons/io';

const Deposittracker = () => {
    const navigate = useNavigate("");
    const location = useLocation();
    const uploaded = location.state?.uploaded || false;
    const [isReleasing, setIsReleasing] = React.useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [depostreleasedpopup,setDepostreleasedpopup] = useState(false);

    const deductionData = {
        title: "Plumbing Repairs",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        date: "Sun, Jun 15, 2024",
        amount: "$200",
        files: [invoice, invoice, invoice]
    };

    return (
        <div className="min-h-screen bg-[#F6FAFF] text-[#333]">
            <Header />

            <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-20">
                {/* Back + Title */}
                <div className="flex items-center gap-3 mb-2">

                    <button type="button" onClick={() => navigate("/app/property-detail")} >
                        <FaArrowLeft size={20} />
                    </button>


                    <h1 className="text-3xl font-[600]">
                        {isReleasing ? "Finalize Deposit Release" : "Deposit Tracker"}
                    </h1>

                </div>
                <p className="text-lg text-gray-600 mb-6 max-w-full pt-3">
                    {isReleasing
                        ? "Review the move-out inspection and finalize the deposit refund process for the tenant."
                        : "You can manage the deposit reserved for your tenant. Keep track of deductions, view history, and release the amount when the agreement ends."}
                </p>


                {/* Total Deposit Amount Card */}
                <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between mb-6">
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">Total Deposit Amount</p>
                        <p className="text-4xl font-[600] text-blue-700">$2,500.00</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        {!isReleasing ? (
                            <>
                                <button
                                    onClick={() => setIsReleasing(true)}
                                    className="px-4 py-2 text-sm rounded-full border bg-gray-300 text-black font-[500] border-gray-300 hover:bg-gray-100 transition"
                                >
                                    Release The Deposit
                                </button>

                                <button
                                    onClick={() => navigate("/app/upload-deduction")}
                                    className="px-4 py-2 text-sm rounded-full font-[500] bg-blue-700 text-white hover:bg-blue-800 transition"
                                >
                                    Upload Deduction
                                </button>
                            </>
                        ) : (
                            <button
                            onClick={()=>{
                                setShowRequestModal(true);
                            }}
                                className="px-4 py-2 text-sm rounded-full border bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-[500] border-gray-300 hover:bg-blue-900 transition"
                            >
                                Release Deposit Amount
                            </button>
                        )}
                    </div>


                    {showRequestModal && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-[#FF3B30] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <TiWarning size={40} />
                                </div>
                                <h2 className="font-semibold text-[20px] mb-2">Release Deposit Amount</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                   Are you sure you want to release the refundable deposit of $2300 to [Tenant Name]? This action cannot be undone.
                                </p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        className="px-8 py-2 text-sm bg-gray-200 rounded-full"
                                        onClick={() => setShowRequestModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                    onClick={()=>{
                                        setShowRequestModal(false);
                                        setDepostreleasedpopup(true);
                                        setTimeout(() => {
                                            navigate("/app/property-detail");
                                        }, 2000);
                                    }}
                                        className="px-8 py-2 text-sm bg-[#FF3B30] text-white rounded-full"
                                      
                                    >
                                       Confirm
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                     {depostreleasedpopup && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                                <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-[#fff] p-6 w-fit mx-auto rounded-full mb-3">
                                    <IoMdCheckmark size={40} />
                                    </div>
                                <h2 className="font-semibold text-[20px] mb-2">Deposit Released!</h2>
                                <p className="text-sm text-gray-600 mb-4">
                                   Are you sure you want to release the refundable deposit of $2300 to [Tenant Name]? This action cannot be undone.
                                </p>
                              
                            </div>
                        </div>
                    )}



                </div>

                {/* Receipts and Deductions Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h3 className="text-md text-black font-semibold mb-4">Receipts and Deductions</h3>
                    {!uploaded && (
                        <div className="text-center py-10 text-gray-500">
                            <p className="font-[600] text-lg text-black">No Receipts Or Deductions Yet</p>
                            <p className="text-sm mt-1">
                                No deductions made yet. You can upload receipts or<br /> invoices for any repair costs or damages.
                            </p>
                        </div>
                    )}

                    {uploaded && (
                        <div className='bg-[#F3F3F3] p-6 rounded-2xl items-start'>
                            <h1 className='font-[500]'>Plumbing Repairs</h1>
                            <p className='text-sm pt-1 pb-1'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <span className='text-[14px] font-[500] pt-1'>Date: Sun,15,2024</span><br />
                            <span className='text-[14px] font-[500] pt-1'>Deduction: <span className='text-red-600'>$200</span></span>
                            <div className='flex justify-end'>
                                <button
                                    onClick={() => navigate("/app/receipts-and-deductions", { state: deductionData })}
                                    className='font-[500] text-[14px] underline text-blue-600'>
                                    View Details
                                </button>
                            </div>
                        </div>
                    )}

                </div>

                {/* Remaining Balance */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
                    <h3 className="text-md text-black font-semibold">Remaining Balance</h3>
                    <p className="text-4xl font-[600] text-blue-700">$2,500.00</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Deposittracker;
