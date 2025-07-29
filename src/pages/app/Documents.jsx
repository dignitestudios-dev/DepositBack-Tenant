import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Header from '../../components/global/Header';
import Footer from '../../components/global/Footer';
import pdfIcon from '../../assets/pdficon.png'; // Replace with actual path
import { useNavigate } from 'react-router';
import Propertycondition from '../../components/app/Propertycondition';
import { useLocation } from 'react-router';
import Repairs from '../../components/app/Repairs';


const Documents = () => {
    const [activeCategory, setActiveCategory] = useState('Rules');
    const [viewMode, setViewMode] = useState('landlord');
    const navigate = useNavigate("");
    const location = useLocation();

    const landlordTabs = ['Agreements', 'Property Conditions', 'Rules'];
    const tenantTabs = ['Agreements', 'Repairs'];
    const [activePopup, setActivePopup] = useState(null); // track which popup is open

    const handleTogglePopup = (docId) => {
        setActivePopup(activePopup === docId ? null : docId);
    };

    const handleDownload = (doc) => {
        // Example: window.open(doc.url)
        alert(`Download clicked for: ${doc.title}`);
        setActivePopup(false);
    };

    const handleDelete = (docId) => {
        alert(`Delete clicked for ID: ${docId}`);
        setActivePopup(false);
    };

    useEffect(() => {
        if (location.state?.tab === "Property Conditions") {
            setViewMode("landlord"); // Optional, if needed
            setActiveCategory("Property Conditions");
        }
    }, [location.state]);


    const landlordDocuments = [
        { title: 'Lease Agreement', file: '#', id: 1 },
        { title: 'Lease Agreement', file: '#', id: 2 },
    ];

    const tenantDocuments = [
        { title: 'Repair Request Form', file: '#', id: 3 },
        { title: 'Repair Confirmation', file: '#', id: 4 },
    ];

    const currentTabs = viewMode === 'landlord' ? landlordTabs : tenantTabs;
    const currentDocuments = viewMode === 'landlord' ? landlordDocuments : tenantDocuments;

    return (
        <div className="min-h-screen bg-[#F6FAFF] p-6 text-[#333]">
            <Header />
            <div className="max-w-[1260px] mx-auto pt-8 pb-[10em]">
                {/* Top Navigation */}

                <div className='flex justify-between'>
                    <div className='flex gap-3 items-center mb-6 pt-3'>
                       <button type="button" onClick={() => navigate("/app/property-detail")}>
                            <FaArrowLeft size={20} />
                        </button>
                        <h1 className="text-3xl font-[600]">Documents</h1>
                    </div>

                    {/* View Mode Buttons */}
                    <div className=''>
                        <div className='flex justify-end mb-6 gap-3'>
                            <div className='bg-white p-1 rounded-full flex gap-2'>
                                <button
                                    onClick={() => {
                                        setViewMode('landlord');
                                        setActiveCategory('Rules');
                                    }}
                                    className={`text-sm px-8 py-3 rounded-full font-medium ${viewMode === 'landlord' ? 'bg-gradient-to-r from-[#003897] to-[#0151DA] text-white' : 'text-black'}`}
                                >
                                    By Landlord
                                </button>
                                <button
                                    onClick={() => {
                                        setViewMode('tenant');
                                        setActiveCategory('Agreements');
                                    }}
                                    className={`text-sm px-8 py-3 rounded-full font-medium ${viewMode === 'tenant' ? 'bg-gradient-to-r from-[#003897] to-[#0151DA] text-white' : 'text-black'}`}
                                >
                                    By Tenant
                                </button>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button onClick={() => {
                                navigate("/app/upload-files")
                            }} className='bg-gradient-to-r from-[#003897] to-[#0151DA] hover:bg-[#0151DA] text-white text-sm px-4 py-3 rounded-full font-medium'>
                                + Upload Files
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className='flex gap-3 mb-6'>
                    {currentTabs.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-3 rounded-full text-sm font-medium ${activeCategory === cat ? 'bg-gradient-to-r from-[#003897] to-[#0151DA] text-white' : 'bg-white text-black'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>


                {/* Documents Grid */}
                {activeCategory === 'Property Conditions' ? (
                    <Propertycondition />
                ) : activeCategory === 'Repairs' ? (
                    <Repairs />
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                            {currentDocuments.map((doc) => (
                                <div key={doc.id} className="bg-white p-10 rounded-xl shadow-md text-center relative">
                                    <img src={pdfIcon} alt="PDF Icon" className="h-[6em] mx-auto" />
                                <p className="mt-3 text-sm font-medium">{doc.title}</p>

                                {/* 3-dot menu */}
                                <div
                                    onClick={() => handleTogglePopup(doc.id)}
                                    className="absolute top-3 right-5 text-gray-900 text-xl cursor-pointer"
                                >
                                    &#8230;
                                </div>

                                {/* Popup Menu */}
                                {activePopup === doc.id && (
                                    <div className="absolute top-10 right-5 bg-white border shadow-md rounded-md w-32 text-left z-10">
                                        <button
                                            onClick={() => handleDownload(doc)}
                                            className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Download
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc.id)}
                                            className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Documents;