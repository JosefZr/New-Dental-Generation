import { useState, useMemo } from "react";
import { size } from "@/lib/mediaQuerys";
import styled from "styled-components";
import "../job.css";
import { useGetAllJobs } from "@/hooks/job/useGetAllJobs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import useGetSubscriptionStatus from "@/hooks/limitation/useGetSubscriptionStatus";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "@/hooks/jwt/useAuthUser";

const Section = styled.section`
  background-image: url(https://www.jointherealworld.com/campus/images/new_hero_bg.png);
  background-size: auto;
  background-position: 0px 0px;
`;

const Global = styled.section`
  opacity: 1;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  @media screen and (max-width: ${size.tablet}) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

export default function Staff() {
  const { data, isLoading, isError, error } = useGetAllJobs();
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const status = useGetSubscriptionStatus()
    const navigate = useNavigate()
  const userInfo = useAuthUser()
  const filteredJobs = useMemo(() => {
    return data?.filter((job) => {
      const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === "" || genderFilter === "all" || 
        job.gender.toLowerCase() === genderFilter.toLowerCase();
      const matchesLocation = locationFilter === "" || locationFilter === "all" || 
        job.location.toLowerCase() === locationFilter.toLowerCase();
      
      return matchesSearch && matchesGender && matchesLocation;
    });
  }, [data, searchTerm, genderFilter, locationFilter]);

  const uniqueLocations = useMemo(() => [...new Set(data?.map((job) => job.location))], [data]);
  const uniqueGenders = useMemo(() => [...new Set(data?.map((job) => job.gender))], [data]);
  const handleLimitation = ()=>{
    navigate(`/profile/${userInfo.userId}`)
  }
  return (
    <Section>
      <Global>
        <Container>
          <div
            className="hero_component blue-bg-glow crypto"
            style={{
              opacity: "1",
              transform: "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <h1 className="h11 text-color-silver mobile-hidden">I WANT STAFF</h1>
            <div className="flex flex-col gap-4 py-8">
              <div
                className="text-[1.75rem]"
                style={{
                  fontFamily: "Urbanist, serif",
                  lineHeight: "1.5rem",
                }}
              >
                No Great Dentist in History became Exceptional alone. Become the leader of your Team.
              </div>
              <div
                className="text-[1.75rem]"
                style={{
                  fontFamily: "Urbanist, serif",
                  lineHeight: "1.5rem",
                }}
              >
                You need to have more trusted dentists working around you. Give The opportunity to the ones who needs
                job, <span className="font-bold"> and grow your clinic. </span>
              </div>
            </div>
          </div>
          <div className="h22 is-18-ch mobile-hidden crypto">Find Your Loyal Team</div>

          {status === "off" ? (
            <div className="max-w-3xl w-full mt-8 min-h-[60vh] flex flex-col justify-center"> {/* Updated height */}
              <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
                {/* Spinning loader */}
                <div className="relative h-20 w-20 sm:h-28 sm:w-28 mb-6">
                  <div className="absolute inset-0 rounded-full border-2 border-white/20"></div>
                  <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
                  <div className="space-y-3 sm:space-y-4">
                    <p className="text-base sm:text-lg font-medium">Wait… What Just Happened?</p>
                    <p className="text-sm sm:text-base text-white/80">You were about to access something BIG—but it's locked.</p>
                    <p className="text-sm sm:text-base text-white/80">Why? Because this feature is only for Zirconium Plan members—the dentists who know that playing small won't get them far.</p>
                    <p className="text-sm sm:text-base text-white/80">Now, you've got two options:</p>
                    <p className="text-sm sm:text-base text-white/80">
                      01- Close this page and pretend you didn't just see the door to next-level growth.
                    </p>
                    <p className="text-sm sm:text-base text-white/80">02- Upgrade now and unlock the cheat codes to double your monthly profit.</p>
                  </div>

                  <div className="w-full max-w-sm px-4 my-6">
                    <button className="buttonCheckout-limit w-full" onClick={handleLimitation}>
                      <div className="a l"></div>
                      <div className="a r"></div>
                      <div className="a t"></div>
                      <div className="a b"></div>
                      <div className="text">UPGRADE NOW & JOIN THE WINNERS!</div>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base text-white/80 max-w-lg">
                    P.S: For less than the price of a single patient visit, you'll get access to strategies that can 10X your income.
                  </p>

                  <button 
                    onClick={() => console.log("close")} 
                    className="mt-4 text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ):(<div className="w-full max-w-4xl mt-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    {uniqueGenders.map((gender) => (
                      <SelectItem key={gender} value={gender.toLowerCase()}>
                        {gender}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {uniqueLocations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-hidden shadow-md rounded-lg mx-2 my-4">
              <table className="w-full table-auto">
                <thead className="bg-my-gray">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Profile
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-my-dark-blue divide-y divide-gray-800">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-center text-white">
                        Loading...
                      </td>
                    </tr>
                  ) : isError ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-center text-red-500">
                        Error: {error.message}
                      </td>
                    </tr>
                  ) : filteredJobs?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-2 text-center text-white">
                        No jobs found
                      </td>
                    </tr>
                  ) : (
                    filteredJobs?.map((job) => (
                      <tr key={job._id}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <img
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${job.name}`}
                            alt={`${job.name}'s avatar`}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-white">{job.name}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-white">{job.gender}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-white">{job.age}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-white">{job.location}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>)}
        </Container>
      </Global>
    </Section>
  );
}