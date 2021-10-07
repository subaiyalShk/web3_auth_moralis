/**
 * GUI code written by Moe & Jai
 */

import React from 'react'
import { DogexBg } from './components/DogexBg.js'
import { AuthBar } from './components/AuthBar.js'
import { Moralis } from "moralis";
import Walletconnect from "./Providers/Walletconnect"
import Desktopconnect  from "./Providers/Desktopconnect"

const { useMoralis } = require("react-moralis");
const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

Moralis.initialize(appId);
Moralis.serverURL = serverUrl;

function App()
{
  const { logout, authenticate, isAuthenticating, isAuthenticated, user } = useMoralis();
  
  const [dimensions, setDimensions] = React.useState(
  {
    height: window.innerHeight,
    width: window.innerWidth
  })

  

  React.useEffect(() =>
  {
      function handleResize()
      {
          setDimensions(
          {
              height: window.innerHeight,
              width: window.innerWidth
          });
      }

      window.addEventListener('resize', handleResize);

      return _ =>
      {
          window.removeEventListener('resize', handleResize);
      };
  });

  

  return (
    <>
      <DogexBg 
        screenSize={dimensions} 
      />
      <AuthBar 
        screenSize={dimensions} 
        isAuthenticated={isAuthenticated}
        authenticate={authenticate}
        isAuthenticating={isAuthenticating}
        user={user}
        logout={logout}
      /> 
      {
        isAuthenticated ?
        <>
          {
            dimensions.width < 480 ?
            <Walletconnect/>:<Desktopconnect/>
          }
        </>
        :
        <>
          
        </>
      }


    </>
  );
}

export default App;
