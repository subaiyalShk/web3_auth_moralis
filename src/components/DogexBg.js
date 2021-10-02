/**
 * GUI code written by Moe
 */

import React from 'react'
import BgDesktop from '../assets/dogexbgD.png'
import BgMobile from '../assets/dogexbgm.png'

export const DogexBg = (props) =>{
    const { screenSize } = props;

    const style ={
        backgroundSize:'cover',
        position:'absolute',
        'zIndex':'-1',
        'width':'100vw',
        'height': '100vh'
    }
    return(
        <>
        {   
            screenSize.width < 860 ?
            <img 
                alt="background"
                src={BgMobile}
                style={style}
            />
            :
            <img
                alt="background" 
                src={BgDesktop}
                style={style}
            />

        }
        </>
    )
}