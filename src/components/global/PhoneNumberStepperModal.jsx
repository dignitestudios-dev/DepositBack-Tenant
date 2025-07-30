import React, { useState } from "react";
import { FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import usaflag from "../../assets/usaflag.png";
import Input from "./Input";
import { useNavigate } from "react-router";

const PhoneNumberModal = ({ onClose }) => {
    const navigate = useNavigate("");
    const [step, setStep] = useState(1);
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [newNumber, setNewNumber] = useState("");
    const [uniqueCode, setUniqueCode] = useState("");

    const handleAddClick = () => {
        if (newNumber.trim()) {
            setPhoneNumbers([...phoneNumbers, newNumber]);
            setNewNumber("");
            setStep(3); // Go to final list step
        }
    };

    const handleDelete = (index) => {
        const updated = [...phoneNumbers];
        updated.splice(index, 1);
        setPhoneNumbers(updated);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] rounded-2xl p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                >
                    <FaTimes />
                </button>

                <h2 className="text-lg font-semibold mb-4">Add Property Details</h2>

                {step === 1 && (
                    <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                            Add Phone Number
                        </label>
                        <div
                            className="border-2 border-dashed bg-[#F6F6F6] border-[#0151DA] text-center py-10 rounded-xl cursor-pointer text-[#0151DA] font-medium"
                            onClick={() => setStep(2)}
                        >
                            <span className="border-b text-sm border-[#0151DA]">
                                Add New Phone Number
                            </span>
                        </div>
                        <button
                            className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-semibold"
                            onClick={() => setStep(3)}
                        >
                            Next
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <Input
                            label="Enter Unique Property Code"
                            type="text"
                            value={uniqueCode}
                            onChange={(e) => setUniqueCode(e.target.value)}
                            placeholder="Text goes here"
                        />

                        <div>
                            <label className="text-sm text-gray-700 block mb-1 mt-4">
                                Phone Number
                            </label>
                            <div className="flex gap-3 items-center">
                                <div className="rounded-full h-[42px] bg-[#F6F6F6] w-[120px] flex items-center justify-center gap-2 px-3">
                                    <img src={usaflag} className="h-5 w-[1.8em]" alt="USA Flag" />
                                    <p className="text-sm">+1</p>
                                </div>
                                <Input
                                    type="tel"
                                    value={newNumber}
                                    onChange={(e) => setNewNumber(e.target.value)}
                                    placeholder="Add phone number"
                                    className="!w-[26em] bg-[#F6F6F6] h-[42px]"
                                />
                            </div>
                        </div>

                        <button
                            className="w-full py-3 rounded-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-semibold"
                            onClick={handleAddClick}
                        >
                            Add
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <label className="text-sm text-gray-700 mb-2 block">
                            Add Phone Number
                        </label>
                        <div
                            className="border-2 border-dashed bg-[#F6F6F6] border-[#0151DA] text-center py-10 rounded-xl cursor-pointer text-[#0151DA] font-medium mb-4"
                            onClick={() => setStep(2)}
                        >
                            <span className="border-b border-[#0151DA]">
                                Add New Phone Number
                            </span>
                        </div>

                        {phoneNumbers.map((num, idx) => (
                            <div
                                key={idx}
                                className="bg-[#F6F6F6] p-3 rounded-2xl flex justify-between items-center mb-2 px-5"
                            >
                                <div>
                                    <h5 className="text-[#5E5F62] font-[400] text-[14px] " >Phone Number</h5>
                                    <span className="text-[14px]">{num}</span>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        className="text-red-500 hover:text-red-500"
                                        onClick={() => handleDelete(idx)}
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                    <button className="text-gray-500 hover:text-blue-500">
                                        <FaEdit size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            className="w-full mt-6 py-3 rounded-full bg-gradient-to-r from-[#003897] to-[#0151DA] text-white font-semibold"
                            onClick={() => {
                                navigate("/app/tentant-property-detail")
                            }}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhoneNumberModal;
