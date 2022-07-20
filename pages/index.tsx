import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Terminology from '../components/Terminology'
import Footer from '../components/Footer'
export default function NextPage() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
      <Intro />
      <Terminology />
      <Footer />
    </div>
  )
}

// export default Home
