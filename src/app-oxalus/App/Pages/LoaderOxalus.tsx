import React from 'react'
import loader from '../../../assets/img/loader.svg';

const LoaderOxalus = () => {
    return(
        <div id="global-loader">
            <img src={loader} className="loader-img" alt="Loader"/>
        </div>
    )
}

export default LoaderOxalus;