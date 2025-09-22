/* eslint-disable react/prop-types */
import { useState } from "react";
import Input from "../../global/Input";
import { phoneFormatter } from "../../../lib/helpers";
import usaflag from "../../../assets/usaflag.png";
import { RiLoader5Line } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";

const AddContactPersonModal = ({
  onClose,
  loading,
  personsData,
  setPersonsData,
  type,
  setContactPersons,
}) => {
  const [addNumber, setAddNumber] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddPerson = () => {
    if (!fullName.trim() || !phoneNumber.trim()) return;

    const newPerson = {
      name: fullName,
      phone: phoneNumber,
    };

    if (editIndex !== null) {
      // update existing
      setPersonsData((prev) =>
        prev.map((person, i) => (i === editIndex ? newPerson : person))
      );
    } else {
      // add new
      setPersonsData((prev) => [...prev, newPerson]);
    }

    // reset form
    setFullName("");
    setPhoneNumber("");
    setAddNumber(false);
    setEditIndex(null);
  };

  const removePerson = (index) => {
    setPersonsData((prev) => prev.filter((_, i) => i !== index));
  };

  const startEditPerson = (index) => {
    setFullName(personsData[index].name);
    setPhoneNumber(personsData[index].phone);
    setAddNumber(true); // open form
    setEditIndex(index); // mark edit mode
  };

  return (
    <div
      onClick={() => setContactPersons(false)}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-[26em] text-center shadow-lg ">
        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-start">
            <h2 className="text-2xl font-[600] mb-2">Add Contact Persons</h2>
          </div>

          {addNumber ? (
            <div>
              {/* Name input */}
              <div className="flex flex-col w-full">
                <label className="mb-1 text-sm font-medium text-gray-700 text-left">
                  Enter Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full py-2.5 px-3 border rounded-full"
                  value={fullName}
                  onChange={(e) => {
                    e.stopPropagation();
                    const value = e.target.value;

                    if (/^[a-zA-Z\s]*$/.test(value)) {
                      setFullName(value);
                    }
                  }}
                />
              </div>

              {/* Phone input */}
              <div className="flex flex-col w-full mt-4">
                <label className="mb-1 text-sm font-medium text-gray-700 text-left">
                  Phone Number
                </label>
                <div className="flex gap-[10px] items-center">
                  <div className="bg-gray-100 rounded-full py-[9px] pl-[6px] pr-[10px] flex items-center gap-2">
                    <img src={usaflag} className="h-4 w-[1.8em]" alt="" />
                    <p>+ 1</p>
                  </div>
                  <Input
                    label=""
                    type="tel"
                    placeholder="Add phone number"
                    value={phoneFormatter(phoneNumber)}
                    onChange={(e) => {
                      e.stopPropagation();
                      setPhoneNumber(e.target.value);
                    }}
                    className="!w-[20em] py-[10px] mb-1"
                    maxLength={14}
                  />
                </div>
              </div>

              {/* Add button */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddNumber(false);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddPerson();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Add new phone option */}
              <div className="flex justify-start">
                <h3 className="text-xs font-medium">Add Phone Number</h3>
              </div>

              <div
                className="border-2 border-dashed bg-white border-blue-500 rounded-lg p-4 text-center cursor-pointer block"
                onClick={(e) => {
                  e.stopPropagation();
                  setAddNumber(true);
                }}
              >
                <p className="text-blue-500 text-sm">Add New Phone Number</p>
              </div>

              {/* List of persons */}
              {personsData.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {personsData.map((person, index) => (
                    <div
                      key={index}
                      className=" w-full rounded border p-2 flex  items-start justify-between text-sm bg-gray-50"
                    >
                      <div className="flex flex-col text-left">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-xs text-gray-500">
                          {person.phone}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditPerson(index);
                          }}
                        >
                          <BiEditAlt size={18} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePerson(index);
                          }}
                        >
                          <MdOutlineDeleteForever size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    disabled={loading}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                    }}
                    className="px-[10em] py-3 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white font-medium"
                  >
                    <div className="flex justify-center items-center">
                      <span className="mr-1">Next</span>
                      {loading && (
                        <RiLoader5Line className="animate-spin text-lg" />
                      )}
                    </div>
                  </button>
                </div>
              )}
              {type === "edit" && (
                <button
                  disabled={loading}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                >
                  <div className="flex justify-center items-center">
                    <span className="mr-1">Skip</span>
                    {loading && (
                      <RiLoader5Line className="animate-spin text-lg" />
                    )}
                  </div>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddContactPersonModal;
