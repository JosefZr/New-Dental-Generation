import { size } from '@/lib/mediaQuerys';
import styled from 'styled-components';
import { GetHeroData } from '../Hero';
import { Logo } from '@/components';
const SubParagraph = styled.h2`
  color: var(--whiteGray);
  text-align: center;
  text-transform: none;
  font-family: Inter Variablefont Slnt Wght, sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1;

  @media screen and (max-width: ${size.laptopL}) {
    font-size: 1.6rem;
  }
  @media screen and (max-width: ${size.laptop}) {
    font-size: 1.2rem;
  }
`;
const HeroHeading = styled.h1`
  background-color: white;
  text-transform: uppercase;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-text-fill-color: transparent;
  background-image: url("/backs/heading-texture_1heading-texture.webp");
  background-clip: text;
  font-size: 3.88rem;
  font-weight: 600;
  line-height: 1;

  @media screen and (max-width: 991px) {
    font-size: 2.8rem;
    margin-top: 1rem;
  }
  @media screen and (max-width: 591px) {
    font-size: 1.8rem;
    margin-top: 1rem;
  }
`;

export default function HeroHeader({actor}) {
    const heroData = GetHeroData(actor);
  return (
    <div className="flex flex-col gap-3 items-center " style={{
      maxWidth:"90%"
    }}>
              <Logo />
              <HeroHeading>
                {heroData.map((data, index) => (
                  <div key={index}>
                    <h1>
                      {data.title}
                    </h1>
                  </div>
                ))}
              </HeroHeading>
              <SubParagraph>
                {heroData.map((data, index) => (
                  <div key={index}>
                    {data.description}
                  </div>
                ))}
              </SubParagraph>
            </div>
  )
}
