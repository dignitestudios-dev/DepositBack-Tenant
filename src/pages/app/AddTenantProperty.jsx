import { useReducer, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
import PhoneNumberModal from "../../components/global/PhoneNumberStepperModal";
import { addPropertyValues, propertyTypes } from "../../init/propertyValues";
import { propertyFormReducer } from "../../lib/helpers";
import { ErrorToast } from "../../components/global/Toaster";
import axios from "../../axios";
import AddContactPersonModal from "../../components/app/dashboard/AddContactPersonModal";
import stateCityData from "../../components/global/CountryData";

const AddTenantProperty = () => {
  const navigate = useNavigate("");

  const [state, dispatch] = useReducer(propertyFormReducer, addPropertyValues);
  const { form, errors } = state;

  const [personsData, setPersonsData] = useState([]);
  const [propertyMedia, setPropertyMedia] = useState([]);
  const [mediaError, setMediaError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contactPersons, setContactPersons] = useState(false);

  const handleUploadPropertyimage = (e) => {
    setMediaError(null);
    const files = Array.from(e.target.files);
    const images = files.filter((file) => file.type.startsWith("image/"));
    setPropertyMedia((prev) => [...prev, ...images]);
  };

  const removeMedias = (index) => {
    setPropertyMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleContactPerson = () => {
    const hasEmptyFields = Object.values(state.form).some((value) => {
      // Handles null, undefined, empty string, or array with no items
      if (typeof value === "string") return value.trim() === "";
      if (Array.isArray(value)) return value.length === 0;
      return !value;
    });
    console.log("🚀 ~ handleContactPerson ~ hasEmptyFields:", hasEmptyFields);

    if (propertyMedia.length === 0) {
      setMediaError("Upload Property Images");
      return;
    }

    if (!hasEmptyFields && Object.keys(state.errors).length === 0) {
      setContactPersons(true);
    } else {
      ErrorToast("Please fill in all valid/required fields.");
    }
  };

  const handleNext = async () => {
    const hasEmptyFields = Object.values(state.form).some((value) => {
      // Handles null, undefined, empty string, or array with no items
      if (typeof value === "string") return value.trim() === "";
      if (Array.isArray(value)) return value.length === 0;
      return !value;
    });

    if (propertyMedia.length === 0) {
      setMediaError("Upload Property Images");
      return;
    }

    if (Object.keys(state.errors).length === 0) {
      try {
        setLoading(true);

        // const dayOnly = form.dueDate
        //   ? new Date(form.dueDate).getDate().toString()
        //   : "";

        const formData = new FormData();
        formData.append("name", form.propertyName || "");
        formData.append("type", form.propertyType || "House");
        formData.append("description", form?.description || "");
        formData.append("address", form.address || "");
        formData.append("city", form.city || "");
        formData.append("state", form.state || "California");
        formData.append("zipcode", form.zipCode || "");
        formData.append("deposit", form.depositAmount || "");
        formData.append("rent", form.rentAmount || "");
        // formData.append("dueDate", form.dueDate);
        formData.append("lateFeeAmount", form.lateFeeAmount || "20");
        formData.append("landlordName", form.landlordName || "");
        formData.append("landlordEmail", form.landlordEmail || "");

        personsData.forEach((person, index) => {
          formData.append(`contactPersons[${index}][name]`, person.name);
          formData.append(`contactPersons[${index}][phone]`, person.phone);
        });

        // Step Two files
        propertyMedia.forEach((file) => {
          formData.append("images", file);
        });

        const response = await axios.post("/properties/tenant", formData);
        if (response.status === 200) {
          console.log("🚀 ~ handleNext ~ response:", response);
          navigate(`/app/property-detail/${response?.data?.data?._id}`, {
            state: { propertyDetail: response?.data?.data },
          });
        }
      } catch (error) {
        console.log("🚀 ~ handlePropertySubmit ~ error:", error.response.data);
        ErrorToast(error.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      ErrorToast("Please fill in all valid/required fields.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#ecf3fd] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3">
            <button type="button" className="border-0">
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-3xl font-semibold text-gray-900">
              Add Property Details
            </h2>
          </div>
          <div className="bg-white mt-10 rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.date}
                  onChange={(e) =>
                    dispatch({
                      type: "DATE_FIELD",
                      field: "date",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="Property Name"
                  value={form.propertyName}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "propertyName",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.propertyName && (
                  <p className="text-red-500 text-sm">{errors.propertyName}</p>
                )}
              </div>
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Property Type
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "propertyType",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                >
                  <option value="">Select Dropdown</option>
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.propertyType && (
                  <p className="text-red-500 text-sm">{errors.propertyType}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Landlord Name
                </label>
                <input
                  type="text"
                  placeholder="Landlord Name"
                  value={form.landlordName}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "landlordName",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.landlordName && (
                  <p className="text-red-500 text-sm">{errors.landlordName}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Landlord's Email (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Landlord Email"
                  value={form.landlordEmail}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "landlordEmail",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.landlordEmail && (
                  <p className="text-red-500 text-sm">{errors.landlordEmail}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "address",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">State</label>
                <select
                  value={form.state}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "state",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityData).map((st, index) => (
                    <option key={index} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">City</label>
                <select
                  value={form.city}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "city",
                      value: e.target.value,
                    })
                  }
                  disabled={!form.state}
                  className="w-full p-3 border rounded-full"
                >
                  <option value="">Select City</option>
                  {stateCityData[form.state]?.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="zipCode"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={form.zipCode}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "zipCode",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">{errors.zipCode}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="rentAmount"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Rent Amount
                </label>
                <input
                  type="text"
                  placeholder="Rent Amount"
                  value={form.rentAmount}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "rentAmount",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border rounded-full"
                />
                {errors.rentAmount && (
                  <p className="text-red-500 text-sm">{errors.rentAmount}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="depositAmount"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Deposit Amount
                </label>
                <input
                  id="depositAmount"
                  type="text"
                  placeholder="Enter deposit amount"
                  value={form.depositAmount}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "depositAmount",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.depositAmount && (
                  <p className="text-red-500 text-sm">{errors.depositAmount}</p>
                )}
              </div>
            </div>

            {/* Description and Upload Documents */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Enter description"
                  rows="5"
                  value={form.description}
                  onChange={(e) =>
                    dispatch({
                      type: "UPDATE_FIELD",
                      field: "description",
                      value: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-2xl"
                ></textarea>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Upload Documents
                </label>
                <div className="flex items-center justify-center w-full h-[145px] border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 p-6">
                  <label
                    htmlFor="fileUpload"
                    className="rounded-lg p-10 text-center cursor-pointer"
                  >
                    <p className="text-black">Upload “Documents”</p>
                    <p className="text-sm text-gray-400">
                      Up to 20MB • JPG, PNG
                    </p>
                    <input
                      type="file"
                      id="fileUpload"
                      accept="image/*"
                      multiple
                      onChange={handleUploadPropertyimage}
                      className="hidden"
                    />
                  </label>
                </div>
                {mediaError && (
                  <p className="text-red-500 text-xs">{mediaError}</p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {propertyMedia.map((file, index) => (
                    <div
                      key={index}
                      className="relative w-20 h-20 rounded overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        className="absolute top-1 right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => removeMedias(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-10">
              <button
                onClick={handleContactPerson}
                className="px-48 py-3 rounded-full gradient-color text-white font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {contactPersons && (
        <AddContactPersonModal
          onClose={() => {
            handleNext();
          }}
          loading={loading}
          personsData={personsData}
          setPersonsData={setPersonsData}
        />
      )}
    </>
  );
};

export default AddTenantProperty;
