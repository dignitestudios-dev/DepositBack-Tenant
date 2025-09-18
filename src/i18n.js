// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          header: {
            home: "Home",
            resources: "Resources",
            reportHistory: "Report History",
            requestFromLandlord: "Request from Landlord",
            messages: "Messages",
            notifications: "Notifications",
            viewAll: "View All",
            viewProfile: "View Profile",
            subscriptionPlans: "Subscription Plans",
            settings: "Settings",
            logout: "Log Out",
            logoutTitle: "Logout",
            logoutMessage: "Are you sure you want to logout your account?",
            yes: "Yes",
            no: "No",
          },
          headings: {
            profile: "Profile",
            notifications: "Notifications",
            messages: "Messages",
            requestFromLandlord: "Request from Landlord",
            reportHistory: "Report History",
            resources: "Resources",
            myProperties: "My Properties",
            propertyDetails: "Property Details",
            reportLandlord: "Report Landlord",
            documents: "Documents",
            depositTracker: "Deposit Tracker",
            inspection: "Inspection",
          },
          settings: {
            title: "Settings",
            notifications: "Notification Settings",
            languages: "Languages",
            change_password: "Change Password",
            // change_number: "Change Number",
            // payment: "Payment Method",
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            delete: "Delete Account",
          },
        },
      },
      es: {
        translation: {
          header: {
            home: "Inicio",
            resources: "Recursos",
            reportHistory: "Historial de Reportes",
            requestFromLandlord: "Solicitud del Propietario",
            messages: "Mensajes",
            notifications: "Notificaciones",
            viewAll: "Ver Todo",
            viewProfile: "Ver Perfil",
            subscriptionPlans: "Planes de Suscripción",
            settings: "Configuraciones",
            logout: "Cerrar Sesión",
            logoutTitle: "Cerrar Sesión",
            logoutMessage: "¿Estás seguro de que deseas cerrar tu cuenta?",
            yes: "Sí",
            no: "No",
          },
          headings: {
            profile: "Perfil",
            notifications: "Notificaciones",
            messages: "Mensajes",
            requestFromLandlord: "Solicitud del Propietario",
            reportHistory: "Historial de Reportes",
            resources: "Recursos",
            myProperties: "Mis Propiedades",
            propertyDetails: "Detalles de la Propiedad",
            reportLandlord: "Reportar al Propietario",
            documents: "Documentos",
            depositTracker: "Rastreador de Depósito",
            inspection: "Inspección",
          },
          settings: {
            title: "Configuraciones",
            notifications: "Configuración de Notificaciones",
            languages: "Idiomas",
            change_password: "Cambiar Contraseña",
            // change_number: "Cambiar Número",
            // payment: "Método de Pago",
            terms: "Términos y Condiciones",
            privacy: "Política de Privacidad",
            delete: "Eliminar Cuenta",
          },
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
