import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DentalLab, DentalStore, Dentist, Patient,Intro } from './pages';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Intro/>}/>
        <Route path='/dentist' element={<Dentist/>}/>
        <Route path='/patient' element={<Patient/>}/>
        <Route path='/dental-lab' element={<DentalLab/>}/>
        <Route path='/dental-store' element={<DentalStore/>}/>
      </Routes>
    </BrowserRouter>
      
  )
}