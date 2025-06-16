import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import approved from "../../assets/approved.png";
import pending from "../../assets/pending.png";
import rejected from "../../assets/rejected.png";

const Pendingapproval = () => {
  const [screenIndex, setScreenIndex] = useState(0); // State to track which screen is being shown
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const timer = setTimeout(() => {
      // Change the screen after 2 seconds
      setScreenIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex > 2) {
          clearTimeout(timer); // Clear the timeout when we reach the last screen
          navigate("/app/home"); // Navigate to the home page
        }
        return newIndex;
      });
    }, 2000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [screenIndex, navigate]);

  return (
    <>
      {/* Show the current screen based on screenIndex */}
      <div className="flex justify-center items-center min-h-screen bg-[#F3F8FF]">
        <div className="text-center w-full">
          {screenIndex === 0 && (
            <>
              <img src={pending} alt="Pending Approval" className="mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Pending Approval</h1>
              <p className="text-gray-600 text-sm">
                Your request to rent this property has been sent to the landlord for approval. The deposit amount will<br />
                be deducted only after the landlord approves your request.
              </p>
            </>
          )}

          {screenIndex === 1 && (
            <>
              <img src={rejected} alt="Rejected" className="mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Rejected</h1>
              <p className="text-gray-600 text-sm">
                Your request to link [Property Name] was rejected by the landlord. The deposit of $2500 remains<br />
                securely reserved and will not be charged unless approved.
              </p>
            </>
          )}

          {screenIndex === 2 && (
            <>
              <img src={approved} alt="Approved" className="mx-auto mb-4" />
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Approved</h1>
              <p className="text-gray-600 text-sm">
                Your deposit for [Property Name] has been approved by the landlord. Funds are now securely held in escrow.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pendingapproval;
