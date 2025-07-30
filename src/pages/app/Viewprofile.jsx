import React, { useState } from 'react';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import user from '../../assets/user.png';
import usertwo from '../../assets/usertwo.png';
import frontID from '../../assets/idfront.png';
import backID from '../../assets/idfront.png';
import EditProfileModal from "../../components/app/EditProfileModal";

const ViewProfile = () => {
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

const handleCloseModal = (wasSuccessful) => {
    setShowEditModal(false);
    if (wasSuccessful) {
        setTimeout(() => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }, 500); // wait for modal to close
    }
};

    return (
        <div className="min-h-screen bg-[#F6FAFF] text-[#333]">
            <Header />

            <div className="max-w-[1260px] mx-auto px-6 pt-8 pb-0">
                <div className='flex gap-4 items-center mb-6'>
                    <button type="button" onClick={() => navigate("/app/Dashboard")}>
                        <FaArrowLeft size={25} />
                    </button>
                    <h2 className="text-[34px] font-[600] leading-[48px] capitalize">Profile</h2>
                </div>

                <div>
                    <div className="flex items-center p-8 rounded-2xl justify-between bg-white">
                        <div className="flex items-center gap-6">
                            <img src={user} alt="Profile" className="w-[7em] h-[7em] border-2 border-blue-600 p-[1px] rounded-full object-cover" />
                            <div>
                                <h3 className="text-2xl font-semibold">Mike Smith</h3>
                                <p className="text-gray-500">mikesmith@gmail.com</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-medium px-10 py-3 rounded-[3px]"
                        >
                            Edit Profile
                        </button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-10">
                        <div className="bg-[#fff] p-0 rounded-xl border">
                            <h4 className="text-[24px] font-[600] mb-4 border-b-2 pl-6 pt-3 pb-3">Personal Details</h4>
                            <div className="md:col-span-2">
                                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                                    <p className="text-sm text-gray-500 ">Full Name</p>
                                    <p className="font-medium">John Doe</p>
                                </div>
                                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium">johndoe@gmail.com</p>
                                </div>
                                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                                    <p className="text-sm text-gray-500">Emergency Contact</p>
                                    <p className="font-medium">+000 0000 000</p>
                                </div>
                                <div className="mb-4 border-b-[1px] pl-6 pt-3 pb-3">
                                    <p className="text-sm text-gray-500">Last Four Digits of SSN</p>
                                    <p className="font-medium">XXXX</p>
                                </div>
                                <div className='pl-6 pt-3 pb-3'>
                                    <p className="text-sm text-gray-500 mb-2 ">Government ID</p>
                                    <div className="flex gap-4">
                                        <div className="text-left bg-[#F6F6F6] p-4 rounded-2xl">
                                            <p className="text-sm font-medium mb-1">Front ID Card</p>
                                            <img src={frontID} alt="Front ID" className="rounded-md h-24 object-cover" />
                                        </div>
                                        <div className="text-left bg-[#F6F6F6] p-4 rounded-2xl">
                                            <p className="text-sm font-medium mb-1">Back ID Card</p>
                                            <img src={backID} alt="Back ID" className="rounded-md h-24 object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                      
                    </div>
                </div>
            </div>
           {showEditModal && <EditProfileModal onClose={handleCloseModal} />}



            {showSuccess && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">
                        <div className="bg-gradient-to-r from-[#003897] to-[#0151DA] text-white p-6 w-fit mx-auto rounded-full mb-3">
                            <FaCheck size={30} />
                        </div>
                        <h2 className="font-semibold text-lg mb-1">Profile Updated!</h2>
                        <p className="text-sm text-gray-600">
                           Your Profile has been successfully updated!
                        </p>
                    </div>
                </div>
            )}



            <Footer />
        </div>
    );
};

export default ViewProfile;
