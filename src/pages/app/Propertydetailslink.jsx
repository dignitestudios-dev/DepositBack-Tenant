import React, { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import Footer from '../../components/global/Footer';
import Header from '../../components/global/Header';
import imageone from "../../assets/propertydetail/home one.webp";
import imagetwo from "../../assets/propertydetail/home two.webp";
import imagethree from "../../assets/propertydetail/home three.webp";
import imagefour from "../../assets/propertydetail/home four.webp";
import imagefive from "../../assets/propertydetail/home five.webp";
import { FaArrowLeft, FaChevronRight, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import user from "../../assets/user.png"
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import backimage from "../../assets/propertydetail/back.png";
import { IoIosWarning } from 'react-icons/io';
import { BsChevronRight } from 'react-icons/bs';
import Modal from '../../components/global/Modal';
import ImageGallery from '../../components/app/ImageGallery';


const Propertydetaillink = () => {
    const navigate = useNavigate("");
    const [showModal, setShowModal] = useState(false);
    const images = [imagetwo, imageone, imagefive, imagethree, imagefour];

    console.log(imageone)

    console.log(images, "This is Images");
    return (
        <div className="min-h-screen bg-[#f6f9ff] p-3">
            <div className="max-w-[1260px] mx-auto pt-10">
                <div className="flex justify-between items-center mb-6">
                    <div className='flex gap-3'>
                        <button type="button" onClick={() => navigate(-1)} >
                            <FaArrowLeft size={18} className='mb-4' />
                        </button>
                        <div>
                            <h1 className="text-[26px] font-[600]">Property Details</h1>
                            <p>Confirm your rental property. Verify that the following property details match your rental agreement.</p>

                        </div>

                    </div>
                    <div className="flex gap-4">

                        <button className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-3 rounded-3xl px-20 py-2 font-medium">
                            Proceed to Deposit</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-white p-6 rounded-2xl">


                    {/* Main Image */}
                    <div className="md:col-span-2">
                        <div className="flex flex-col md:flex-row gap-4">
                            <ImageGallery images={images} />
                            {/* Left - Large Image */}


                            {/* Right - 4 Smaller Images in 2x2 Grid */}


                        </div>
                    </div>
                    <div className="bg-white p-6 w-[44em]">
                        <div className='flex justify-between'>
                            <h2 className="!text-3xl font-semibold mb-2">Property Name</h2>
                            <div>
                                <span className="text-[#0151DA] font-[600] ml-4 text-2xl">$1200</span> <span className="text-sm font-medium text-gray-400">/month</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2 font-[500]"><LuMapPin className="mr-1" /> 456 Maple Street, Anytown, NY 12345</div>
                        <p className="text-1xl font-[500] text-gray-600 mb-2">Unique Code: <span className="text-blue-600 font-medium">258496</span></p>

                        <div
                            style={{ backgroundImage: `url(${backimage})` }}
                            className="bg-cover bg-center rounded-3xl pl-3 pr-3 pt-3 pb-3 text-white"
                        >
                            <div className="flex gap-3 justify-between pt-3">
                                <div className="flex gap-3">
                                    <img src={user} className="h-[3.3em] w-[3.3em] rounded-full object-cover cursor-pointer" alt="User Avatar" />
                                    <div>
                                        <span className="text-1xl font-[500]">Mike Smith</span>
                                        <p className="text-sm text-white">Tenant</p>
                                    </div>
                                </div>

                            </div>
                            <div className="text-sm text-white mb-4 mt-3 ml-3">
                                <div className='flex justify-start gap-3'>
                                    <p className='flex gap-2 items-center'><FaEnvelope />
                                        mikesmith@gmail.com</p>
                                    <p className='flex gap-2 items-center'><FaPhoneAlt />
                                        +1 834-0570-746</p>
                                </div>


                            </div>
                        </div>
                        <div className='bg-[#F3F8FF] flex justify-between items-center p-4 rounded-2xl mt-4'>
                            <p>  Deposit Amount</p>
                            <span className="text-[#0151DA] font-[600] ml-4 text-2xl">$1200</span> 
                        </div>
                        <div className="mt-4">
                            <h3 className="!text-[20px] font-[500] mb-2">Description</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet.
                            </p>
                        </div>

                    </div>

                    {/* Tenant Sidebar */}
                    <div className="bg-[#F3F8FF] w-[30em] rounded-2xl p-6">
                        <div className=" pt-0 text-sm">
                            <div className='flex justify-between items-center pb-1 pl-3 pr-3'> <h5 className="font-[500] text-black mb-2 text-[16px]">Reviews by Tenant</h5>
                                <span>View all</span></div>

                            {[1, 2, 3].map((_, index) => (
                                <div key={index} className="border-b pb-4 mb-4 pl-6 pt-3 bg-white rounded-2xl ">

                                    <div className="flex justify-between items-center text-xs text-gray-500 pr-8 pt-3">
                                        <div className="flex items-center gap-2 text-[12px] text-black font-[500]">
                                            <img src={user} alt="Reviewer" className="w-[3em] h-[3em] rounded-full" />
                                            <span>
                                                Mike Smith
                                                <div className="flex items-center gap-0">
                                                    <span className="text-yellow-500 text-lg">★</span>
                                                    <span className="text-sm font-semibold ml-2">4.5</span>
                                                </div>
                                            </span>

                                        </div>
                                        <span>Jan 22, 2024</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">
                                        Amazing product. I booked on Monday and I got my order on the next day. I'm highly impressed with their services. Highly recommended!
                                    </p>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Propertydetaillink;
