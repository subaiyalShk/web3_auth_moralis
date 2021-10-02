/**
 * Migration code written and documented by Jai
 * GUI code written by Moe & Jai
 *
 * This class contains code that handles and displays the token migration process for a given token and user.
 */

import React, { useState } from 'react'
import { Box, Button, Center, Flex, Image, Spinner} from "@chakra-ui/react";
import { Moralis } from "moralis";

import axios from "axios";
import Launch from '../assets/launch.png'

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

const baseUrl = process.env.REACT_APP_BASE_URL;

const tokenType = process.env.REACT_APP_TOKEN_TYPE;
const tokenAddressV1 = process.env.REACT_APP_TOKEN_ADDRESS_V1;

const ownerAddress = process.env.REACT_APP_OWNER_ADDRESS;

Moralis.initialize(appId);
Moralis.serverURL = serverUrl;

export const Migration = props =>
{
    const { user, isAuthenticated, setMigrated, statusUpdate } = props;
    const [loading, setLoading] = useState(false)

    /**
     * Transfers an authenticated users V1 tokens to a given address in exchange for V2 tokens.
     */
    async function migrate()
    {
        const userAddress = user.get("accounts");

        if (!userAddress)
            return;

        let body;

        await axios.post(baseUrl + '/api/eligibility', { data: { address: userAddress } })
                   .then(async (response) =>
                   {
                       body = response.data;
                   })
                   .catch(() =>
                   {
                       setLoading(false);
                       statusUpdate('Backend', 'You must be an iOS + trust wallet user, please take a screenshot and contact Admin', 'error');
                   });

        if (body.result)
        {
            const currentBalance = body.result;

            statusUpdate('Processing', 'Processing V1 Tokens 😁', 'info');
            const result = await sendV1Tokens(userAddress, currentBalance);

            if (result.blockHash)
            {
                statusUpdate('Received', 'Your V1 Tokens were received 🔥', 'info');
                await axios.post(baseUrl + '/api/submit_migration', { data: { address: userAddress, hash: result.blockHash, amount: currentBalance } })
                           .then(async (response) =>
                           {
                               body = response.data;
                           });

                const hasMigrated = body.result;

                setLoading(false);

                if (hasMigrated === "success")
                {
                    statusUpdate('Success', 'We will dispatch your V2 Tokens ASAP 💪', 'success');
                    setMigrated(true);
                }
                else
                {
                    statusUpdate('Error', 'Should you be here? 🧐', 'error');
                    statusUpdate('Support', 'If you believe you\'ve received this message in error, please contact: @dogexfalcon on Telegram', 'info');
                    setMigrated(false);
                }
                return;
            }
            else
            {
                statusUpdate('Error', 'Your transaction failed, try using some more gas? 😅', 'error');
                setLoading(false);
                setMigrated(false);
                return;
            }
        }
        statusUpdate('Error', 'Your wallet is ineligible for migration 😢', 'error');
        setLoading(false)
        setMigrated(false);
    }

    /**
     * Transfers V1 tokens from the users authenticated address to a given address.
     *
     * @param  {String} userAddress Users (authenticated) wallet address
     * @param  {int} currentBalance Amount currently held by the user
     *
     * @return {Promise} The transfer result object
     */
    async function sendV1Tokens(userAddress, currentBalance)
    {
        const requestDetails =
        {
            type: tokenType,
            amount: currentBalance,
            receiver: ownerAddress,
            contract_address: tokenAddressV1
        };

        return await Moralis.transfer(requestDetails);
    }

    function initiateMigration()
    {
        const onClickHandler = () =>
        {
            setLoading(true)
            migrate()
        }

        const button = () =>
        {
            return(
                <Button
                    loadingText="Migrating"
                    borderRadius="50px"
                    backgroundColor="white"
                    color="#8223E2"
                    type="submit"
                    onClick={()=> onClickHandler()}
                    disabled={!isAuthenticated}
                    >
                        Migrate Tokens
                </Button>
            )
        }

        const spinner = () =>
        {
            return(
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            )
        }

        return(
            <>
                {loading?spinner():button()}
            </>
        );
    }

    return (
        <Flex m={3} w={"auto"} h="80vh" flexDirection="column" alignItems="center" justifyContent="center">
            <Image width="190px" src={Launch}/>
            <Box h="30px"/>
            <Center>
                <Box w="100%"  display="flex" alignItems="center" >
                    { initiateMigration() }
                </Box>
            </Center> 
        </Flex>
    );
};