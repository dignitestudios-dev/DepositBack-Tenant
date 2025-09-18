import Addinspectiondetail from "../../pages/app/Addinspectiondetail";
import AddPropertyDetail from "../../pages/app/Addpropertydetail";
import AddTenantProperty from "../../pages/app/AddTenantProperty";
import Dashboard from "../../pages/app/Dashboard";
import Deposittracker from "../../pages/app/Deposittracker";
import Documents from "../../pages/app/Documents";
import Inspection from "../../pages/app/Inspection";
import LandlordProfile from "../../pages/app/LandlordProfile";
import LandlordRequest from "../../pages/app/LandlordRequest";
import Linkpropertydetails from "../../pages/app/Linkpropertydetails";
import Linkyourrentproperty from "../../pages/app/Linkyourrentproperty";
import Message from "../../pages/app/Message";
import Notifications from "../../pages/app/Notifications";
import Paymentmethodplan from "../../pages/app/Paymentmethodplan";
import Paysecuritydeposite from "../../pages/app/Paysecuritydeposite";
import Pendingapproval from "../../pages/app/Pendingapproval";
import Photo from "../../pages/app/Photo";
import Privacypolicy from "../../pages/app/Privacypolicy";
import PropertyDetail from "../../pages/app/PropertyDetail";
import Propertydetaillink from "../../pages/app/Propertydetailslink";
import Propertylinkedsuccess from "../../pages/app/Propertylinkedsuccess";
import Receiptsanddeductions from "../../pages/app/Receiptsanddeductions";
import Renthistory from "../../pages/app/Renthistory";
import Report from "../../pages/app/Report";
import ReportHistory from "../../pages/app/ReportHistory";
import ReportDetailHistory from "../../pages/app/ReportHistoryDetail";
import Resources from "../../pages/app/Resources";
import Setting from "../../pages/app/Setting";
import Subscriptionplans from "../../pages/app/Subscriptionplans";
import Tenantrequests from "../../pages/app/Tenantrequests";
import Tentantpropertydetail from "../../pages/app/Tentantpropertdetail";
import Termsandconditions from "../../pages/app/Termsandconditions";
import Uploaddeduction from "../../pages/app/Uploaddeduction";
import Uploadfiles from "../../pages/app/Uploadfiles";
import Video from "../../pages/app/Video";
import Viewprofile from "../../pages/app/Viewprofile";

export const appRoutes = [
  {
    url: "dashboard",
    page: <Dashboard />,
    name: "Dashboard",
    isPublic: true,
  },
  {
    url: "report-history",
    page: <ReportHistory />,
    name: "Report History",
    isPublic: true,
  },
  {
    url: "report/:_id",
    page: <Report />,
    name: "Report",
    isPublic: true,
  },

  {
    url: "report-detail",
    page: <ReportDetailHistory />,
    name: "Report History",
    isPublic: true,
  },
  {
    url: "property-detail/:id",
    page: <PropertyDetail />,
    name: "Property Detail",
    isPublic: true,
  },
  {
    url: "landlord-profile",
    page: <LandlordProfile />,
    name: "Landlord Profile",
    isPublic: true,
  },
  {
    url: "rent-history",
    page: <Renthistory />,
    name: "Rent History",
    isPublic: true,
  },
  {
    url: "notifications",
    page: <Notifications />,
    name: "Notificationss",
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
  {
    url: "tentant-property-details",
    page: <Linkpropertydetails />,
    name: "Property Details",
    isPublic: true,
  },
  {
    url: "req-from-landlord",
    page: <LandlordRequest />,
    name: "Property Details",
    isPublic: true,
  },
  {
    url: "add-inspection-details",
    page: <Addinspectiondetail />,
    name: "Add Inspection Detials",
    isPublic: true,
  },
  {
    url: "property-linked-success",
    page: <Propertylinkedsuccess />,
    name: "Property linked success",
    isPublic: true,
  },
  {
    url: "add-tentant-property",
    page: <AddTenantProperty />,
    name: "Add Tentant Property",
    isPublic: true,
  },
  {
    url: "tentant-property-detail",
    page: <Tentantpropertydetail />,
    name: "Tentant Property Details",
    isPublic: true,
  },
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
];
