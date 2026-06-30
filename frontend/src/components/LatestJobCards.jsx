import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-card/60 border border-border/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div>
        <h1 className="font-medium text-lg text-foreground">{job?.company?.name}</h1>
        <p className="text-sm text-muted-foreground">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-foreground">{job?.title}</h1>
        <p className="text-sm text-muted-foreground">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className={"text-[#E9B3FB] font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#FF0087] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#B0FFFA] font-bold"} variant="ghost">
{(() => {
            const lpa = Number(job?.salary);
            if (!Number.isFinite(lpa)) return `${job?.salary ?? ""}BDT`;
            return `${lpa}BDT`;
          })()}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
