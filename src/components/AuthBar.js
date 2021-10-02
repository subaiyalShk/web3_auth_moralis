/**
 * GUI code written by Moe & Jai
 */

import React from 'react'
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import logo1 from '../assets/logo.png'
import logo2 from '../assets/logo2.png'

export const AuthBar = (props) =>{
    
    const {
        isAuthenticated, 
        authenticate, 
        isAuthenticating, 
        logout, 
        screenSize, 
        user
    } = props;
    
    function walletConnect()
    {
        if (!isAuthenticated && screenSize.width < 860)
        {
            return (
                <Button 
                    bg="linear-gradient(to right, #2b56f5 0%, #8224e3 100%);" 
                    loadingText="Connecting" 
                    variant="outline" 
                    onClick={ () => authenticate(
                    {
                        provider: "walletconnect",
                        chainId: 56,
                        mobileLinks:
                        [
                            "metamask",
                            "trust",
                            "rainbow",
                            "argent",
                            "imtoken",
                            "pillar",
                        ],
                        signingMessage:"Welcome to The Official DogeX Migration Portal"
                    }) }>
                        Connect Wallet
                </Button>
            );
        }

        if (!isAuthenticated && screenSize.width > 860)
        {
            return (
                <Button 
                    bg="linear-gradient(to right, #2b56f5 0%, #8224e3 100%);" 
                    loadingText="Connecting" 
                    variant="outline" 
                    onClick={ () => authenticate() }>
                        Connect Wallet
                </Button>
            );
        }

        return(
            <Button 
                bg="linear-gradient(to right, #2b56f5 0%, #8224e3 100%);" 
                loadingText="Disconnecting"
                type="submit" 
                onClick={ () => logout() } 
                disabled={isAuthenticating}
            >
              { 
                String(user.get("accounts")).substring(0, 6) +
                "..." +
                String(user.get("accounts")).substring(38)
              }
            </Button>
        );
    }

    function walletStatus()
    {
        if (!isAuthenticated)
        {
            return '🔴 No wallet connected 🔴'
        }

        return '🟢 Wallet connected 🟢'
    }

    

    const desktopLayout = () => {
        return(
            <Flex m={3} w="100%" alignItems="center" justifyContent="space-between" marginLeft="80px" marginRight="80px" >
               <Box 
                    width="190px" 
                    height="50px" 
                >
                    <img
                        alt='logo' 
                        src={logo1} 
                        width="190px" 
                        height="50px" 
                    />
                </Box>
             
                <Box display="flex" alignItems="center" >
                    <Heading size="sm">{ walletStatus() }</Heading>
                </Box>
             
            
                <Box width="190px" display="flex" alignItems="center" justifyContent="flex-end" >
                    { walletConnect() }
                </Box>
            </Flex>
        )
    }

    const mobileLayout = () => {
        
        return(
            <Flex m={3} w="100%" alignItems="center" justifyContent="space-between" >
                 <Box 
                    width="138px" 
                    height="40px" 
                >
                    <img
                        alt='logo' 
                        src={logo2} 
                        width="138px" 
                        height="40px" 
                    />
                </Box>

            
                <Box width="138px" display="flex" alignItems="center" justifyContent="flex-end" >
                    { walletConnect() }
                </Box>
            </Flex>
        )
    }

    const style = {
        'display':'flex',
        'justifyContent': 'space-between',
        'backgroundColor':'black',
        'height':'85px',
        'paddingLeft':'20px',
        'paddingRight':'20px'
    }

    return(
        <div style={style}>
            { screenSize.width > 860 ? desktopLayout() : mobileLayout() }
        </div>
    )
}