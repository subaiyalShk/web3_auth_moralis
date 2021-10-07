/**
 * GUI code written by Moe & Jai
 */

 import React, {useState} from 'react'
 import { useToast } from "@chakra-ui/react";
 import { Box, Center, Flex, Input, Stack, Text, Button} from "@chakra-ui/react";
 import { Moralis } from "moralis";
 
 const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
 const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
 console.log(appId, serverUrl)
 
 Moralis.initialize(appId);
 Moralis.serverURL = serverUrl;
 
 function Desktopconnect()
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
 
   // React.useEffect(() =>
   // {
   //     if(window.localStorage.walletconnect){
 
   //     }
   // });
 
 
   const send = async () =>{
 
     await Moralis.enable();
 
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
         statusUpdate('Success', 'Your tokens were successfully transferred', 'success')
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
                    backgroundColor="white"
                    color="#8223E2"
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
 
 export default Desktopconnect;