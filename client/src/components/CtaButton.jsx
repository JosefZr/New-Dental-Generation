import styled from "styled-components"
import { Subscribers } from "."
import { useTranslation } from "react-i18next"

const ButtonWrap = styled.div`
    z-index: 5;
    grid-column-gap: .75rem;
    grid-row-gap: .75rem;
    flex-direction: column;
    align-items: center;
    display: flex;
    position: relative;
`
const Button = styled.div`
    line-height: 1;

`
// eslint-disable-next-line react/prop-types
export default function CtaButton({withSubscribers, isSmall, cta}) {
    const {t} = useTranslation();
    return (
        <ButtonWrap>
            <Button>
            <button className={`cta-button ${isSmall && 'text-lg'}`}>
                {(cta) ? t('cta'):"Build_Your_Dentlal_Network"}
            </button>

            </Button>
            {withSubscribers ==="true" ? (
                <Subscribers/>
            ):("")
            }
            

        </ButtonWrap>
    )
}
