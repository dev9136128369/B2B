// app/partner-form/page.jsx
import RegasterForm from "@/components/RegasterForm";
import Navbar from "@/components/Navbar";

export default function PartnerFormPage() {
  const roles = ["Partner", "Supplier", "Other"]; // Static or fetched server-side

  return (
    <>
      <Navbar />
      <RegasterForm roles={roles} />
    </>
  );
}
