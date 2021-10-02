/**
 * GUI code written by Moe & Jai
 */

import React, {useState} from 'react'
import { Migration } from "./Forms/Migration.js";
import { DogexBg } from './components/DogexBg.js'
import { AuthBar } from './components/AuthBar.js'
import { Success } from './components/Success.js'
import { useToast } from "@chakra-ui/react";

const { useMoralis, useMoralisWeb3Api } = require("react-moralis");

function App()
{
  const { logout, authenticate, isAuthenticating, isAuthenticated, user } = useMoralis();
  const [ hasMigrated, setMigrated ] = useState(false)
  const toast = useToast()
  const [dimensions, setDimensions] = React.useState(
  {
    height: window.innerHeight,
    width: window.innerWidth
  })

  const statusUpdate = (title, message, status) =>
    {
        toast(
        {
            title: title,
            description: message,
            status: status,
            duration: 20000,
            isClosable: true,
        });
    };

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
        hasMigrated?
        <Success/>
        :
        <Migration 
          screenSize={dimensions} 
          isAuthenticated={isAuthenticated}
          user={user}
          useMoralisWeb3Api={useMoralisWeb3Api}
          setMigrated={setMigrated}
          statusUpdate={statusUpdate}
        /> 
      }
           
    </>
  );
}

export default App;
