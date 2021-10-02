/**
 * GUI code written by Moe
 */

import { extendTheme, Box, Flex } from "@chakra-ui/react"

const theme = extendTheme({
    textStyles: {
      h1: {
        // you can also use responsive styles
        fontSize: ["48px", "72px"],
        fontWeight: "bold",
        lineHeight: "110%",
        letterSpacing: "-2%",
      },
      h2: {
        fontSize: ["36px", "48px"],
        fontWeight: "semibold",
        lineHeight: "110%",
        letterSpacing: "-1%",
      },
    },
  })

export const Errorpg = () =>{
    
    return(
        <Box 
            w="100vw" 
            h="100vh" 
            bg="#0F0F0F" 
            paddingLeft="30px" 
            paddingRight="30px" 
            paddingTop="10px" 
            paddingBottom="10px"
        >
            <Flex m={3} w={"auto"} flexDirection="column" alignItems="center" justifyContent="center">
                <Box textStyle="h1">
                    Access this site using a desktop
                </Box>
            </Flex>
        </Box>
    )
}