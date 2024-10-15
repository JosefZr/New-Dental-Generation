/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import styled from 'styled-components';
import i18n from '@/i18n';

const StyledSelect = styled.select`
  background-color: #c2c2c22b;
  border: 1px solid #c2c2c2bb;
  padding: 9px 0.4rem;
  cursor: pointer;

  option {
    background-color: #c2c2c22b;
    color: black;
  }

  &:focus {
    outline: none;
    background-color: #c2c2c22b;
  }
`;

export default function LanguageSwitcher({intro}) {

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);  // Should be a valid function
  };

  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [i18n.language]);

  return (
    <StyledSelect  onChange={handleLanguageChange} defaultValue={i18n.language} className={`${intro && " text-white"}`}>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="ar">العربية</option>
      <option value="ru">Русский</option>
    </StyledSelect>
  );
}
