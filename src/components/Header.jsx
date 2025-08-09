import React from "react";
import { useSelector } from 'react-redux';
import AuthenticatedHeader from './AuthenticatedHeader';
import HomeHeader from './HomeHeader';
import OnboardingHeader from './OnboardingHeader'


const Header = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const currentRoute = window.location.pathname;

  const getHeaderType = () => {
    if (!isAuth && (currentRoute === "/login" || currentRoute === "/signup")) {
      return "onboarding";
    } else if (isAuth) {
      return "authenticated";
    } else {
      return "unauthenticated";
    }
  };

  switch (getHeaderType()) {
    case 'onboarding':
      return <OnboardingHeader />;
    case 'authenticated':
      return <AuthenticatedHeader />;
    case 'unauthenticated':
      return <HomeHeader />;
    default:
      return null;
  }
};

export default Header;

