import { setSearchedQuery } from "@/redux/jobSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-secondary text-primary font-medium border border-border/50 shadow-[0_0_0_1px_rgba(88,166,255,0.15)] animate-[apexHeroBrand_1.1s_ease-in-out_infinite]">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            ApexCareers
          </span>
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          <span className="inline-block animate-[apexHeroText_pulse_1.2s_ease-in-out_infinite]">
            Search, Apply & <br /> Get Your
          </span>
          <br />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#00B8D4] to-[#00FFCC] animate-[apexHeroDream_pop_1.4s_ease-in-out_infinite]">
            Dream Jobs
          </span>
        </h1>

        <div className="flex w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] shadow-lg border border-border/60 pl-3 rounded-full items-center gap-4 mx-auto bg-card/40 backdrop-blur animate-[apexHeroSearch_1.6s_ease-in-out_infinite]">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full bg-transparent text-foreground placeholder:text-muted-foreground"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full animate-[apexHeroBtn_1.8s_ease-in-out_infinite]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
