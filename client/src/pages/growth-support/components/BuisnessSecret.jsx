import styled from "styled-components"
import "./BuisnessSecret.css"
import { LiaChessBishopSolid } from "react-icons/lia"
const Hero = styled.div`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  background-image: radial-gradient(circle at 50% 0, #00ff9436 12%, #fff0 31%);  padding-left: 10px;
  padding-right: 10px;

  column-gap: 1rem;
  row-gap: 1rem;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 2rem;
  display: flex
;`
export default function BuisnessSecret() {
  return (
    <div>
      <Hero>
      <h1 className="h1 text-color-silver business max-md:hidden">You Win or You Win</h1>
      <h1 className="h1 text-color-silver business md:hidden ">You Win or You Win</h1>
      <h2 className="h2 text-color-silver business">So how you’ll Win? </h2>
      <p className="hero_sub-text text-color-silver">All successful people have learned business skills and those skills made them rich. </p>

      <p className="p-24">
        If you go through All The
        <span className="text-color-white"> Business Secrets Lessons </span>
        and you
        <strong className="text-color-white"> focus </strong>
        on the
        <strong className="text-color-white"> tricks </strong>
        that I revealed to you.
      </p>

      <p className="hero_sub-text text-color-silver">I Guarantee you that you’ll be the one who can look at any job, any business, Any Opportunity. 
      And immediately see what’s the best way is to take the most advantage from it.</p>

      <h2 className="h2 text-color-silver business">In other words, you become someone valuable in any situation in life.  </h2>
      <br />
      <h3 className="h3-timeline fitness">Those Secrets are Given only to Loyal members. </h3>
      <h3 className="h3-timeline fitness">If you’re loyal, then…</h3>

      <h4 className="h4 fitness">…You will UNLOCK This Course only if you’re inside YDN for more than 3 months.</h4>
      <h2 className="h2 text-color-silver business flex flex-row items-center gap-5">PS: BS only AVAILABLE For Silver Bishop <LiaChessBishopSolid className="text-[5rem]"/> </h2>

    </Hero>
    </div>
  )
}
