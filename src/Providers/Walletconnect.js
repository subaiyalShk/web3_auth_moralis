/**
 * GUI code written by Moe & Jai
 */

 import React, {useState} from 'react'
 import { useToast } from "@chakra-ui/react";
 import { Box, Center, Flex, Input, Stack, Text, Button} from "@chakra-ui/react";
 import { Moralis } from "moralis";
 
 const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
 const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;

 
 Moralis.initialize(appId);
 Moralis.serverURL = serverUrl;
 
 function Walletconnect()
 {
   const [balance, setBalance] = useState(0);
   const [recipient, setRecipient] = useState('')
   const [contractAdd, setContractAdd] = useState('0x7718a3b0e016dCF90D48971A216c43Ec9DC696F4'.toUpperCase())
 
   const toast = useToast()
   
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
 
    React.useEffect(() => {
        const enableit = async () => {
            if(window.localStorage.walletconnect){
                await Moralis.enable({provider: 'walletconnect'});
            }
        }
        enableit()
    },[]);

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          window.localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
        }
    });
 
   const send = async () =>{

     const requestDetails = {
       amount: balance,
       receiver: recipient.toUpperCase(),
     }
 
     console.log(requestDetails);
 
     await Moralis.transfer(requestDetails).then(
       result => {
         console.log(result);
         statusUpdate('Success', 'Your tokens were successfully transferred', 'success')
       }
     ).catch (
       error =>{
         console.log(error)
         statusUpdate('Error', 'Something went wrong', 'error')
       }
     )
   }
 
   return (
        <Flex m={3} w={"auto"} h="80vh" flexDirection="column" alignItems="center" justifyContent="center">
            <Center>
                <Box w="100%" display="flex" alignItems="center" flexDirection="column" >
                <Stack spacing={3}>
                <Text mb="8px">Amount</Text>
                    <Input
                        value={balance}
                        onChange={(e)=>setBalance(e.target.value)}
                        placeholder="Enter amount to send"
                        size="sm"
                        bg='white'
                        color="black"
                    />
                    <Text mb="8px">Recipient Address</Text>
                    <Input
                        value={recipient}
                        onChange={(e)=>setRecipient(e.target.value)}
                        placeholder="Enter recipient address"
                        size="sm"
                        bg='white'
                        color="black"
                    />
                    {/* <Text mb="8px">Contract Address</Text>
                    <Input
                        value={contractAdd}
                        onChange={(e)=>setContractAdd(e.target.value)}
                        placeholder="Enter  contract address"
                        size="sm"
                        bg='white'
                        color="black"
                    /> */}
                    <Button
                        loadingText="Migrating"
                        // borderRadius="50px"
                        bg="linear-gradient(to right, #487DA5 0%, #1B2B40 100%);" 
                        color="white"
                        type="submit"
                        onClick={()=> send()}
                    >
                        Send Tokens
                </Button>
                </Stack>
                </Box>
            </Center> 
        </Flex>
   );
 }
 
 export default Walletconnect;
 