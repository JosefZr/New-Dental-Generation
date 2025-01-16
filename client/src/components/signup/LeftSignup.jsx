import { FaKey } from "react-icons/fa6";
import { MdDone } from "react-icons/md";
import { useTranslation } from "react-i18next";

export default function LeftSignup() {
  const { t } = useTranslation();

  // Retrieve titles and descriptions from translations
  const unlock = t("unlock", { returnObjects: true });

  // Transform titles into an array for dynamic rendering
  const transformToArray = (titles) => {
    if (typeof titles !== "string") return [];
    return titles
      .split(".")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const features = transformToArray(unlock?.titles);

  return (
    <div className="scrollbar-custom text-center text-[20px] lg:font-bold hidden lg:flex lg:flex-col lg:px-2 lg:text-left lg:mb-none lg:bg-alternate lg:pt-[56px] lg:pb-[54px] lg:sticky lg:top-0 lg:left-0 sm:overflow-y-scroll">
      <div className="relative lg:mr-3 lg:mx-0 rounded-full overflow-hidden max-w-[300px] max-h-[300px] mx-auto self-center mb-5">
        <img
          src="/signLogo.jpg"
          alt="logo"
          className="hidden lg:block trw-logo w-full h-full object-cover transform scale-[1.39] text-center"
        />
      </div>
      <div className="flex flex-col text-[28px] mb-6">
        <div className="flex flex-row items-center gap-3 mb-3">
          <FaKey className="text-my-gold" />
          <div className="xl:text-[36px] lg:text-[28px] text-[24px] font-bold">
            {t("unlock.accessTitle", "UNLOCK ACCESS TO...")}
          </div>
        </div>
        {features.map((desc, index) => (
          <div key={index} className="flex flex-row mb-4 gap-2">
            <MdDone className="text-my-gold" />
            <div className="text-[16px]">{desc}</div>
          </div>
        ))}
        <div className="lg:text-[20px] mb-2 lg:ml-[10px] max-w-lg">
          {unlock?.desc && (
            <p>
              {unlock.desc.split(".").map((sentence, idx) => (
                <div key={idx}>{sentence.trim()}</div>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
