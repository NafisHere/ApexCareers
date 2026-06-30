import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, Link } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Loader2, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";

const CompanyVerificationStatus = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyStatus = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${COMPANY_API_END_POINT}/verification-status/${companyId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setCompany(response.data.company);
        } else {
          setError("Failed to fetch company status");
          toast.error("Failed to fetch company status");
        }
      } catch (error) {
        console.error("Error fetching company status:", error);
        setError(error.response?.data?.message || "An error occurred");
        toast.error(error.response?.data?.message || "Failed to fetch company status");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyStatus();
    }
  }, [companyId]);

  // Get status badge based on verification status
  const getStatusBadge = (status) => {
    const base =
      "bg-black text-white border border-cyan-400/30 hover:bg-black";

    switch (status) {
      case "approved":
        return (
          <Badge className={base + " text-green-400 border-green-400/40"}>Approved</Badge>
        );
      case "rejected":
        return (
          <Badge className={base + " text-red-400 border-red-400/40"}>Rejected</Badge>
        );
      case "pending":
        return (
          <Badge className={base + " text-amber-400 border-amber-400/40"}>Pending</Badge>
        );
      default:
        return <Badge className={base}>Unknown</Badge>;
    }
  };

  // Get status icon based on verification status
  const getStatusIcon = (status) => {
    const iconBase = "h-8 w-8";
    const borderClass =
      status === "approved"
        ? "border-green-400/40"
        : status === "rejected"
          ? "border-red-400/40"
          : status === "pending"
            ? "border-amber-400/40"
            : "border-cyan-400/30";

    const iconClass =
      status === "approved"
        ? "text-green-400"
        : status === "rejected"
          ? "text-red-400"
          : status === "pending"
            ? "text-amber-400"
            : "text-cyan-300";

    switch (status) {
      case "approved":
        return (
          <div className={`h-14 w-14 rounded-full bg-black ${borderClass} flex items-center justify-center`}>
            <CheckCircle className={`${iconBase} ${iconClass}`} />
          </div>
        );
      case "rejected":
        return (
          <div className={`h-14 w-14 rounded-full bg-black ${borderClass} flex items-center justify-center`}>
            <XCircle className={`${iconBase} ${iconClass}`} />
          </div>
        );
      case "pending":
        return (
          <div className={`h-14 w-14 rounded-full bg-black ${borderClass} flex items-center justify-center`}>
            <Clock className={`${iconBase} ${iconClass}`} />
          </div>
        );
      default:
        return null;
    }
  };

  // Get status message based on verification status
  const getStatusMessage = (status) => {
    switch (status) {
      case "approved":
        return "Company Verification: Approved";
      case "rejected":
        return "Company Verification: Rejected";
      case "pending":
        return "Your company is pending verification. You cannot post jobs until an admin approves it.";
      default:
        return "Unable to determine company status.";
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-[#7209b7] mb-4" />
        <p className="text-white/70">Loading company status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <XCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-400 font-medium mb-2">Error</p>
        <p className="text-white/70">{error}</p>
        <Button asChild className="mt-4">
          <Link to="/recruiter/companies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <XCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-red-400 font-medium mb-2">Company Not Found</p>
        <p className="text-white/70">The requested company could not be found.</p>
        <Button asChild className="mt-4">
          <Link to="/recruiter/companies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/recruiter/companies">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Companies
        </Link>
      </Button>

      <Card className="max-w-2xl mx-auto bg-black border-cyan-400/20 shadow-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-white">{company.name}</CardTitle>
              <CardDescription className="text-muted-foreground text-white/70">Company Verification Status</CardDescription>
            </div>
            {getStatusBadge(company.verificationStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            {getStatusIcon(company.verificationStatus)}
            <p className="text-white">{getStatusMessage(company.verificationStatus)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-sm font-medium text-white/70">Company Name</h3>
              <p className="mt-1 text-white">{company.name}</p>
            </div>

            {company.description && (
              <div>
                <h3 className="text-sm font-medium text-white/70">Description</h3>
                <p className="mt-1 text-white">{company.description}</p>
              </div>
            )}

            {company.location && (
              <div>
                <h3 className="text-sm font-medium text-white/70">Location</h3>
                <p className="mt-1 text-white">{company.location}</p>
              </div>
            )}

            {company.website && (
              <div>
                <h3 className="text-sm font-medium text-white/70">Website</h3>
                <p className="mt-1">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    {company.website}
                  </a>
                </p>
              </div>
            )}

            <div>
                <h3 className="text-sm font-medium text-white/70">Registration Date</h3>
                <p className="mt-1 text-white">{new Date(company.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          {company.verificationStatus === "approved" ? (
            <Button asChild className="bg-cyan-500 hover:bg-cyan-400 text-black">
              <Link to="/recruiter/jobs/create">Post a Job</Link>
            </Button>
          ) : (
            <p className="text-sm text-white/90">
              {company.verificationStatus === "pending"
                ? "Verification Status: Pending. You cannot post jobs until an admin approves it."
                : "Verification Status: Rejected. Please contact an administrator."}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyVerificationStatus;
