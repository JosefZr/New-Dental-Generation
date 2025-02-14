/* eslint-disable react/prop-types */
import { FaCheckCircle } from "react-icons/fa";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/Select";
import styled from "styled-components";

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

export default function PersonalInformationForm({formData,handleInputChange, handleProfessionChange,handleImageChange,handleRegionChange,preview}) {
    return (
        <div className="flex flex-col">
        <div className='lg:mx-0 lg:text-lg flex mx-auto text-[#B7B7B7]'>
          <FaCheckCircle />
          <p className='ml-[9px] font-black'>PERSONAL INFORMATION</p>
        </div>
        
        <div className='flex flex-col w-full lg:pl-9'>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            type='text'
            required
            placeholder='First Name'
            className="rounded-md input-class"
          />
          
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder='Last Name'
            className="rounded-md input-class"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"

            autoComplete='email'
            placeholder='example@gmail.com'
            className="input-class mt-1 w-full rounded-md text-gray-700 shadow-sm py-2"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            className="w-full rounded-md input-class"
            placeholder='●●●●●●●'
            required
            value={formData.password}
            onChange={handleInputChange}
          />
          <Label htmlFor="region">Region</Label>
          <Select
            id="region"
            name='region'
            type="text"
            className="input-class rounded-md text-sm text-gray-700 shadow-sm py-3"
            required
            value={formData.region}
            onValueChange={handleRegionChange}
          >
            <SelectTrigger className=" bg-black h-12 border-gray-500">
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent className="bg-black text-my-white">
              <SelectGroup >
                <SelectLabel>regions</SelectLabel>
                <SelectItem value="algeria">Algeria</SelectItem>
                <SelectItem value="russia">Russia</SelectItem>
                <SelectItem value="egypt">Egypt</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="autre">Somewhere in the world</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Label htmlFor="profession">Profession</Label>
          <Select
            id="profession"
            name='profession'
            type="text"
            className="input-class rounded-md text-sm text-gray-700 shadow-sm py-3"
            required
            value={formData.role}
            onValueChange={handleProfessionChange}
          >
            <SelectTrigger className="w-full bg-black h-12 border-gray-500">
              <SelectValue placeholder="Select a profession" />
            </SelectTrigger>
            <SelectContent className="bg-black text-my-white">
              <SelectGroup >
                <SelectLabel>Professions</SelectLabel>
                <SelectItem value="dentist">Dentist</SelectItem>
                <SelectItem value="store">Dental Store</SelectItem>
                <SelectItem value="lab">Dental Lab</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {formData.role && (
          <div >
            <Label htmlFor="image">Image</Label>
            <input 
              type="file" 
              name='image' 
              accept='image/png , image/jpg , image/jpeg '
              onChange={handleImageChange}
            />
            <img src={preview}  />
          </div>
        )}
      </div>
    )
}
