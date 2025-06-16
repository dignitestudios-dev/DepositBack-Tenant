import AddPropertyDetail from "../../pages/app/Addpropertydetail";
import Dashboard from "../../pages/app/Dashboard";
import Deposittracker from "../../pages/app/Deposittracker";
import Documents from "../../pages/app/Documents";
import Inspection from "../../pages/app/Inspection";
import Linkyourrentproperty from "../../pages/app/Linkyourrentproperty";
import Message from "../../pages/app/Message";
import Paymentmethodplan from "../../pages/app/Paymentmethodplan";
import Paysecuritydeposite from "../../pages/app/Paysecuritydeposite";
import Pendingapproval from "../../pages/app/Pendingapproval";
import Photo from "../../pages/app/Photo";
import Privacypolicy from "../../pages/app/Privacypolicy";
import PropertyDetail from "../../pages/app/PropertyDetail";
import Propertydetaillink from "../../pages/app/Propertydetailslink";
import Receiptsanddeductions from "../../pages/app/Receiptsanddeductions";
import Renthistory from "../../pages/app/Renthistory";
import Resources from "../../pages/app/Resources";
import Setting from "../../pages/app/Setting";
import Subscriptionplans from "../../pages/app/Subscriptionplans";
import Tenantrequests from "../../pages/app/Tenantrequests";
import Termsandconditions from "../../pages/app/Termsandconditions";
import Uploaddeduction from "../../pages/app/Uploaddeduction";
import Uploadfiles from "../../pages/app/Uploadfiles";
import Video from "../../pages/app/Video";
import Viewprofile from "../../pages/app/Viewprofile";

export const appRoutes = [

    {
        url: "add-property-details",
        page: <AddPropertyDetail />,
        name: "Add Property Details",
        isPublic: true,
    },
    {
        url: "terms-and-conditions",
        page: <Termsandconditions />,
        name: "Terms And Conditions",
        isPublic: true,
    },
    {
        url: "privacy-policy",
        page: <Privacypolicy />,
        name: "Privacy policy",
        isPublic: true,
    },
    {
        url: "dashboard",
        page: <Dashboard />,
        name: "Dashboard",
        isPublic: true,
    },
    {
        url: "property-detail",
        page: <PropertyDetail />,
        name: "Property Detail",
        isPublic: true,
    },
    {
        url: "rent-history",
        page: <Renthistory />,
        name: "Rent History",
        isPublic: true,
    },
    {
        url: "documents",
        page: <Documents />,
        name: "Documents",
        isPublic: true,
    },
    {
        url: "upload-files",
        page: <Uploadfiles />,
        name: "Upload Filed",
        isPublic: true,
    },
    {
        url: "photo",
        page: <Photo />,
        name: "Photo",
        isPublic: true,
    },
    {
        url: "video",
        page: <Video />,
        name: "Video",
        isPublic: true,
    },
    {
        url: "deposit-tracker",
        page: <Deposittracker />,
        name: "Deposittracker",
        isPublic: true,
    },
    {
        url: "upload-deduction",
        page: <Uploaddeduction />,
        name: "Upload Deduction",
        isPublic: true,
    },
    {
        url: "receipts-and-deductions",
        page: <Receiptsanddeductions />,
        name: "Receipts and Deductions",
        isPublic: true,
    },
    {
        url: "inspection",
        page: <Inspection />,
        name: "Inspection",
        isPublic: true,
    },
    {
        url: "tenant-requests",
        page: <Tenantrequests />,
        name: "Tenantrequests",
        isPublic: true,
    },
    {
        url: "resources",
        page: <Resources />,
        name: "Resources",
        isPublic: true,
    },
    {
        url: "messages",
        page: <Message />,
        name: "Message",
        isPublic: true,
    },
    {
        url: "subscription-plans",
        page: <Subscriptionplans />,
        name: "Subscription Plans",
        isPublic: true,
    },
    {
        url: "payment-method-plan",
        page: <Paymentmethodplan />,
        name: "Payment method plan",
        isPublic: true,
    },
    {
        url: "view-profile",
        page: <Viewprofile />,
        name: "View profile",
        isPublic: true,
    },
    {
        url: "settings",
        page: <Setting />,
        name: "Setting",
        isPublic: true,
    },
     {
        url: "link-rental-property",
        page: <Linkyourrentproperty />,
        name: "Link Rental Property",
        isPublic: true,
    },
      {
        url: "property-detail-link",
        page: <Propertydetaillink />,
        name: "Property detail link",
        isPublic: true,
    },
         {
        url: "pay-security-deposite",
        page: <Paysecuritydeposite />,
        name: "Pay Security Deposite",
        isPublic: true,
    },
     {
        url: "tentant-account-status",
        page: <Pendingapproval />,
        name: "Pending",
        isPublic: true,
    },
]