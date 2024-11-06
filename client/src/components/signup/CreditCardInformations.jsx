/* eslint-disable react/prop-types */
import { FaCheckCircle } from "react-icons/fa"
import styled from "styled-components"

const Label = styled.label`
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: space-between;
  padding: .5rem .25rem;
  line-height: 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--white-gray);
`
const Input = styled.input`
    flex-shrink: 1;
    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    line-height: 2;
    line-height: 1.5rem;
    border-width: 1px;
    border-color: hsl( 145 0% 78%/0.4 );
    --tw-border-opacity: 0;
    --tw-bg-opacity: 1;
    color: var(--white-gray);
    background-color: hsl(100 0 0 / 1);
    border-radius: var(0.5rem, .5rem);
    &:focus {
      border: 1px solid gray;  /* Add a gray border on focus */
      outline: none;           /* Remove default outline */
    }
`
export default function CreditCardInformations({formData,handleInputChange}) {
  return (
    <div>
    <div className='section-title lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7] justify-center lg:justify-start'>
      <FaCheckCircle/>
      <p className='ml-[9px] font-black'>ENTER CREDIT CARD</p>
    </div>
      <div className='flex flex-col lg:pl-9'>
        <div className='form-control w-full'>
          <div>
          <Label htmlFor="cardNumber">Card number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.firstName}
              onChange={handleInputChange}
              type='tel'
              required
              placeholder='xxxx xxxx xxxx xxxx'
              className="rounded-md input-class w-full"
            />
            
            <Label htmlFor='expiryDate'>Expiration Date</Label>
            <Input
              type="tel"
              id="expiryDate"
              name="expiryDate"
              placeholder='MM/YY'
              className="rounded-md input-class w-full"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />

            <Label htmlFor="cvc">CVC</Label>
            <Input
              type="tel"
              id="cvc"
              name="cvc"

              autoComplete='cvc'
              placeholder='xxx'
              className="input-class mt-1 w-full rounded-md text-gray-700 shadow-sm py-2"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <Label htmlFor="address">Billing Address</Label>
            <Input
              type="password"
              id="address"
              name="address"
              className="w-full rounded-md input-class"
              placeholder='Billing Address'
              required
              value={formData.password}
              onChange={handleInputChange}
            />

      
          </div>
        </div>
      </div>              
  </div>
  )
}
