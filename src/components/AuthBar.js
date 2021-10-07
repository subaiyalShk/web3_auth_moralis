/**
 * GUI code written by Moe & Jai
 */

import React from 'react'
import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import logo1 from '../assets/logo.png'
import logo2 from '../assets/logo2.png'

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Moralis } from "moralis";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

Moralis.initialize(appId);
Moralis.serverURL = serverUrl;


export const AuthBar = (props) =>{
    
    const {
        isAuthenticated, 
        authenticate, 
        isAuthenticating, 
        logout, 
        screenSize, 
        user
    } = props;


    async function authentication () {
        console.log("pressed")
    // ---------------------------------------------------
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider, // required
                options: {
                    infuraId: "62ff589de1564eb3a939f59d4a54ff81" // required
                }
            }
        };
        
        const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
        });
        
        const provider = await web3Modal.connect();
        
        // const web3 = new Web3(provider);

        // Moralis.enable(web3);
    // ------------------------------------------------------  
    }


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
                    onClick={ () => authentication() }>
                        Connect Wallet
                </Button>
            );
        }

        return(
            <Button 
                bg="linear-gradient(to right, #487DA5 0%, #1B2B40 100%);" 
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
                    width="78px" 
                    height="60px" 
                >
                    <img
                        alt='logo' 
                        src={logo2} 
                        width="78px" 
                        height="20px" 
                        top="-10px"
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
        'backgroundColor':'#1F344B',
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