import React, { useEffect } from "react";
import { useNavigate } from "react-router"; // Import useNavigate hook from react-router-dom
import approved from "../../assets/approved.png";
import Header from "../../components/global/Header";
import Footer from "../../components/global/Footer";

const Propertylinkedsuccess = () => {
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Redirect to /app/Dashboard after 3 seconds
    const timer = setTimeout(() => {
      navigate("/app/Dashboard");
    }, 3000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center mt-[14em] mb-[14em] bg-[#F3F8FF]">
      <div className="text-center w-full">
        <img src={approved} alt="Pending Approval" className="mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Property Linked Successfully
        </h1>
        <p className="text-gray-600 text-sm">
          You are now linked to [Property Name]. Start managing your rental
          agreement and stay connected with your landlord.
        </p>
      </div>
    </div>
  );
};

export default Propertylinkedsuccess;
