
import React from 'react';
import {motion} from 'framer-motion';

interface PropsAnimate{
    children?: any
}

const SettingAnimate = {
    show:{
        opactiy: 1,
        y:0,
        scale: 1
    },
    hidde:{
        opactiy: 0,
        y: -100,
        scale: 0.1,
    }
}

const AnimateZoomIn = (props: PropsAnimate) =>{
    return(
        <React.Fragment>
            <motion.div 
                transition={{duration: 0.6}} 
                initial={'hidde'} 
                variants={SettingAnimate} 
                animate={"show"}>
                {props?.children}
            </motion.div>
        </React.Fragment>
    )
}

export { AnimateZoomIn }