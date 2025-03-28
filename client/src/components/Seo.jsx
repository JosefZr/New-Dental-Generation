// components/Seo.jsx
import { Helmet } from 'react-helmet-async';

export const Seo = ({ title, description, keywords }) => (
  <Helmet>
    <title>{title || "Your Dental Network"}</title>
    <meta 
      name="description" 
      content={description || "Dr.Truth 'Dentistry Mastery Code is the key to becoming a successful dentist who runs a profitable practice and It's attainable only through Building Your Dental Network {YDN}.'"} 
    />
    <meta 
      name="keywords" 
      content={keywords || "dental practice, dentist software, patient retention, dental management"} 
    />
  </Helmet>
);