import { Cadre } from "@/components"
import styled from "styled-components"
import CtaBasicCard from "./components/CtaBasicCard"
import CtaPreniumCard from "./components/CtaPreniumCard"
import CtaHeaders from "./components/CtaHeaders"

const SectionPath = styled.section`
  position: relative;
  background-image: url("/backs/path.svg");
  background-repeat: repeat;
  background-size: cover;
  background-position: center;
  color: #02040e;
`

const Container = styled.div`
  z-index: 2;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  position: relative;
`

const PathContent = styled.div`
  text-align: center;
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 100%;
`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  gap: 2rem;
  padding: 0 1rem;
  
  @media screen and (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-top: 3rem;
    place-items: center;
    justify-content: center;
  }
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`

// eslint-disable-next-line react/prop-types
export default function Path({ GetChecks, actor }) {
  return (
    <SectionPath>
      <div className="padding-global">
        <Container className="container-large">
          <div className="padding-section-medium">
            <PathContent>
              <CtaHeaders actor={actor} />
              <Cadre actor={actor} />
              <CardsContainer>
                <CardWrapper>
                  <CtaBasicCard actor={actor} GetChecks={GetChecks} />
                </CardWrapper>
                <CardWrapper>
                  <CtaPreniumCard actor={actor} />
                </CardWrapper>
              </CardsContainer>
            </PathContent>
          </div>
        </Container>
      </div>
    </SectionPath>
  )
}

