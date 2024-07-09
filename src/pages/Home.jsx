import React from 'react';
import Navigation from '../components/Navbar';
import Search from '../components/Search'
import Filter from '../components/Search'

function Home() {
  return (
    <div className="home-page">
      <Navigation />
      <Search />
      <Filter />
    </div>
  )
}

export default Home;
