import styled from "styled-components";
import { size } from "@/lib/mediaQuerys";
import { useTranslation } from "react-i18next";

const TitleGrey = styled.div`
  letter-spacing: 3px;
  text-transform: uppercase;
  /* -webkit-text-fill-color: transparent; */
  /* background-image: linear-gradient(106deg, #777, #9c9c9c); */
  /* -webkit-background-clip: text; */
  background-clip: text;
  font-weight: 500;
  line-height: 1;
  font-size: 1.88rem;
  display: inline-block;
  color: var(--gold);
  @media screen and (max-width: ${size.laptop}) {
    font-size: .9rem;
    text-align: center;
  } 
`;
const H2 = styled.h2`
  text-align: center;
  text-transform: uppercase;
  background-image: url("/backs/5.svg"),
  linear-gradient(125deg, #fff 85%, #fff0);
  background-position: 0 0, 0 0;
  background-size: auto, auto;
  -webkit-background-clip: text;
  background-clip: text;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 2.75rem;
  font-weight: 600;
  color: var(--smallTittle);
  line-height: 1.1;
  @media screen and (max-width: ${size.tablet}) {
    font-size: 1.8rem;
  } 
`;
// const Svg =styled.div`
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 1.75rem;
//   height: 1.8125rem;
//   margin-top: .5rem;
//   margin-bottom: .5rem;
//   display: flex;
//   position: relative;
//   right: -4px;
// `

// eslint-disable-next-line react/prop-types
export default function CtaHeaders({actor}) {
  const {t} = useTranslation()
  return (
    <><div className="vflex-center-8 w-layout-vflex">
            <TitleGrey className=" uppercase">{t(`${actor}.plans.title`)}</TitleGrey>
            <H2>{t(`${actor}.plans.title2`)}</H2>
        </div>
        <div>
                {/* <div className="hflex-center-16 justify-center">
                    <Svg>
                        <TbWorldBolt className=" h-10 w-12 text-my-gray" />
                    </Svg>
                    <H2>{t("plans.title3")}</H2>
                </div>
                <div className="hflex-center-16 justify-center">
                    <Svg>
                        <MdOutlineWorkHistory className=" h-10 w-12 text-my-gray" />
                    </Svg>
                    <H2>{t('plans.title4')}</H2>
                </div> */}
                <p className="text-my-white-gray mb-0 leading-7">{t(`${actor}.plans.desc`)}</p>
                <p className="text-my-small-white-title font-semibold">{t(`${actor}.plans.desc2`)}</p>
            </div>
    </>
    )
}
