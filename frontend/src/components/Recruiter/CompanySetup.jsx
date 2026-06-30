import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2, CheckCircle, XCircle, Clock, Info } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Card, CardContent } from "../ui/card";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiter/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Check company verification status
  const checkVerificationStatus = async (companyId) => {
    if (!companyId) return;
    
    try {
      setCheckingStatus(true);
      const response = await axios.get(
        `${COMPANY_API_END_POINT}/verification-status/${companyId}`,
        { withCredentials: true }
      );
      
      if (response.data.success) {
        setVerificationStatus(response.data.verificationStatus);
      }
    } catch (error) {
      console.error("Error checking company verification status:", error);
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
    
    // Check verification status when company data is loaded
    if (singleCompany?._id) {
      checkVerificationStatus(singleCompany._id);
    }
  }, [singleCompany]);
  
  // Get status badge based on verification status
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-black text-green-400 border border-green-400/40 hover:bg-black">Approved</Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-black text-red-400 border border-red-400/40 hover:bg-black">Rejected</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-black text-amber-400 border border-amber-400/40 hover:bg-black">Pending</Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status icon based on verification status
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-400" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-400" />;
      default:
        return <Info className="h-5 w-5 text-cyan-300" />;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 px-4">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-4 sm:p-8">
            <Button
              onClick={() => navigate("/recruiter/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <div className="flex flex-col">
              <h1 className="font-bold text-xl">Company Setup</h1>
              {verificationStatus && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-gray-500">Status:</span>
                  {checkingStatus ? (
                    <div className="flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-sm">Checking...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {getStatusIcon(verificationStatus)}
                      {getStatusBadge(verificationStatus)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Verification Status Alert */}
          {verificationStatus && (
            <div className="mb-6 px-8">
              <Alert className={`bg-black border border-cyan-400/20 text-white ${
                verificationStatus === "approved"
                  ? "border-green-400/40"
                  : verificationStatus === "pending"
                    ? "border-amber-400/40"
                    : verificationStatus === "rejected"
                      ? "border-red-400/40"
                      : "border-cyan-400/20"
              }`}>
                <div className="flex items-center">
                  {getStatusIcon(verificationStatus)}
                  <AlertTitle className="ml-2 text-white">
                    Verification Status: {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
                  </AlertTitle>
                </div>
                <AlertDescription className="mt-2 text-white/90">
                  {verificationStatus === 'approved' ? (
                    "Your company is verified and you can post jobs."
                  ) : verificationStatus === 'pending' ? (
                    "Your company is pending verification. You cannot post jobs until an admin approves it."
                  ) : verificationStatus === 'rejected' ? (
                    "Your company has been rejected. Please contact an administrator for more information."
                  ) : (
                    "Unable to determine company status."
                  )}
                </AlertDescription>
                <div className="mt-3">
              <Button asChild variant="outline" size="sm" className="border-cyan-400/30 text-white hover:bg-black hover:text-cyan-300">
                    <Link to={`/recruiter/companies/${singleCompany?._id || params.id}/status`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </Alert>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
