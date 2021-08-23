import React, { useState, useEffect } from 'react';
// import '../../../../App.css';
import HeroSection from '../../../shared/HeroSection/HeroSection';

export default function Home () {
    
    useEffect(() => {
        document.title = "OI Exam System";
    }, [])

    return (
        <>
            <HeroSection/>
        </>
    )
};