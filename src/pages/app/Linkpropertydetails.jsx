import React, { useState } from 'react';
import { LuMapPin } from 'react-icons/lu';
import Footer from '../../components/global/Footer';
import Header from '../../components/global/Header';
import imageone from "../../assets/propertydetail/home one.webp"
import imagetwo from "../../assets/propertydetail/home two.webp";
import imagethree from "../../assets/propertydetail/home three.webp";
import imagefour from "../../assets/propertydetail/home four.webp";
import imagefive from "../../assets/propertydetail/home five.webp";
import { FaArrowLeft, FaChevronRight, FaEnvelope, FaPhoneAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { RiDeleteBinFill, RiEdit2Fill } from 'react-icons/ri';
import user from "../../assets/user.png"
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import backimage from "../../assets/propertydetail/back.png";
import { IoIosWarning } from 'react-icons/io';
import { BsChevronRight } from 'react-icons/bs';
import Modal from '../../components/global/Modal';
import ImageGallery from '../../components/app/ImageGallery';


const Linkpropertydetails = () => {
    const navigate = useNavigate("");
    const [showModal, setShowModal] = useState(false);
    const images = [imagetwo, imageone, imagefive, imagethree, imagefour];

    console.log(imageone)

    console.log(images, "This is Images");
    return (
        <div className="min-h-screen bg-[#f6f9ff] p-3">
            <Header />
            <div className="max-w-[1260px] mx-auto pt-10">
                <div className="flex justify-between items-center mb-6">
                    <div className='flex gap-3'>
                        <button type="button" className='mb-6' onClick={() => navigate(-1)} >
                            <FaArrowLeft size={18} />
                        </button>
                        <div>
                              <h1 className="text-[26px] font-[600]">Property Details </h1>
                        <p>Confirm your rental property. Verify that the following property details match your rental agreement.</p>

                        </div>
                      
                    </div>
                    <div className="flex gap-4">

                        <button className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white flex items-center gap-1 rounded-3xl px-4 py-2 font-medium"><FaUser />
                            Report</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 bg-white p-6 rounded-2xl">


                    {/* Main Image */}
                    <div className="md:col-span-2">
                        <div className="flex flex-col md:flex-row gap-4">
                            <ImageGallery images={images} />
                        </div>
                    </div>
                    <div className="bg-white p-6 w-[44em]">
                        <div className='flex justify-between'>
                            <h2 className="!text-3xl font-semibold mb-2">Property Name</h2>
                            <div>
                                <span className="text-[#0151DA] font-[600] ml-4 text-3xl">$2500</span> <span className="text-sm font-medium text-gray-400">/monthly</span>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600 mb-2 font-[500]"><LuMapPin className="mr-1" /> 456 Maple Street, Anytown, NY 12345</div>
                        <p className="text-1xl font-[500] text-gray-600 mb-2">Unique Code: <span className="text-blue-600 font-medium">258496</span></p>

                        <div className="mt-4">
                            <h3 className="!text-[20px] font-[500] mb-2">Description</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget dictum libero. Vivamus ac aliquam dui. Curabitur ut libero non justo pellentesque sollicitudin. Nulla mauris est, venenatis et volutpat sit amet, efficitur sit amet lectus.
                            </p>
                        </div>
                        <div className='bg-[#F3F8FF] p-3 flex items-center justify-between rounded-2xl mt-4'>
                            <p>Deposit Amount</p>
                            <span className="text-[#0151DA] font-[600] ml-4 text-2xl">$30000</span>

                        </div>
                        <button onClick={()=>{
                            navigate("/app/pay-security-deposite")
                        }} className="text-sm font-medium bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-3 rounded-full mt-7 w-full">
                            Proceed to Deposit
                        </button>

                    </div>

                    {/* Tenant Sidebar */}
                    <div className="bg-[#F3F8FF] w-[30em] rounded-2xl p-6">
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
                                <div>
                                    <div className="bg-[#fff] p-3 rounded-xl">
                                        <IoChatbubbleEllipsesOutline size={20} color="blue" />
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Linkpropertydetails;
