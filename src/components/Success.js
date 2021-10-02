/**
 * GUI code written by Moe
 */

import { Image, Flex } from "@chakra-ui/react"
import Successimg from '../assets/success.png'

export const Success = () => {

    return(
        <Flex m={3} w={"auto"} h="80vh" flexDirection="column" alignItems="center" justifyContent="center">
            <Image width="50%" src={Successimg}/>
        </Flex>
    )
}