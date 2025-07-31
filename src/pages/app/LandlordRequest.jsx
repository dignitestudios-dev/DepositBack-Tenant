import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../../components/global/Header";
import { FaArrowLeft } from "react-icons/fa";
import RequestFromLandlord from "../../components/app/RequestFromLandlord";

const StatusIndicator = ({ statuses, onStatusChange, setStatus }) => {
  return (
    <div className="flex items-center px-3 h-[42px] bg-white rounded-full shadow-sm ">
      {statuses?.map((status, index) => (
        <button
          key={status.label}
          onClick={() => {
            setStatus(status?.label);
            onStatusChange?.(index);
          }}
          className={`px-6 h-[34px] rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
            status.isActive
              ? "gradient-color text-white shadow-md"
              : "text-[#181818] hover:text-gray-800 hover:bg-gray-50"
          }`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default function LandlordRequest() {
  const navigate = useNavigate("");

  const [activeStatus, setActiveStatus] = useState(0);
  const [status, setStatus] = useState("pending");

  const statusOptions = [
    { label: "Pending", isActive: activeStatus === 0 },
    { label: "Approved", isActive: activeStatus === 1 },
    { label: "Rejected", isActive: activeStatus === 2 },
  ];

  const handleStatusChange = (index) => {
    setActiveStatus(index);
  };

  return (
    <div className="min-h-screen bg-[#F6FAFF]  text-[#333]">
      <Header />
      <div className="max-w-[1260px] mx-auto pt-8 pb-[10em]">
        {/* Top Navigation */}

        <div className="flex justify-between">
          <div className="flex gap-3 items-center mb-6 pt-3">
            <button type="button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-[600]">Request from Landlord</h1>
          </div>
          <div className="flex justify-center">
            <StatusIndicator
              statuses={statusOptions}
              setStatus={setStatus}
              onStatusChange={handleStatusChange}
            />
          </div>
        </div>
        <RequestFromLandlord status={status} />
      </div>
    </div>
  );
}
