import React, { useState } from "react";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";
import PhoneNumberModal from "../../components/global/PhoneNumberStepperModal";

const AddTenantProperty = () => {
    const [propertyName, setPropertyName] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [rentAmount, setRentAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [lateFeePolicy, setLateFeePolicy] = useState("");
    const navigate = useNavigate("");
    const [propertymedia, setPropertyMedia] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleUploadPropertyimage = (e) => {
        const files = Array.from(e.target.files);
        const images = files.filter(file => file.type.startsWith("image/"));
        setPropertyMedia(prev => [...prev, ...images]);
    };

    const removeMedias = (index) => {
        setPropertyMedia(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#ecf3fd] py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex gap-3">
                        <button type="button" className="border-0" >
                            <FaArrowLeft size={20} />
                        </button>
                        <h2 className="text-3xl font-semibold text-gray-900">Add Property Details</h2>

                    </div>
                    <div className="bg-white mt-10 rounded-xl shadow-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Date</label>
                                <input type="date" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Property Name</label>
                                <input type="text" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Landlord Name</label>
                                <input type="text" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Landlord's Email (Optional)</label>
                                <input type="email" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Address</label>
                                <input type="text" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">City</label>
                                <input type="text" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Zip Code</label>
                                <input type="text" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Rent Amount</label>
                                <input type="text" placeholder="Enter text here" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Deposit Amount</label>
                                <input type="text" placeholder="$" className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        {/* Description and Upload Documents */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea rows="5" placeholder="Enter text here" className="w-full p-3 border border-gray-300 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700">Upload Documents</label>
                                <div className="flex items-center justify-center w-full h-[145px] border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 p-6">
                                    <label htmlFor="documentUpload" className="text-center cursor-pointer">
                                        <p className="text-gray-600">Upload “Documents”</p>
                                        <p className="text-sm text-gray-400">Upto 20mb PDF, JPG, PNG</p>
                                        <input type="file" id="documentUpload" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-10">
                            <button onClick={()=>setShowModal(true)} className="px-48 py-3 rounded-full gradient-color text-white font-medium">
                                Next
                            </button>
                        </div>
                    </div>


                </div>
            </div>


            {showModal && <PhoneNumberModal onClose={() => setShowModal(false)} />}
            <Footer />
        </>
    );
};

export default AddTenantProperty;
