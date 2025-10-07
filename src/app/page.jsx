import React from 'react'
import styles from './page.module.css'
import Header from '../components/Header'

function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.main}>
        <p>The Fate of Ophelia</p>
        <p>Actually Romantic</p>
        <p>Elizabeth Taylor</p>
      </div>

    </div>
  )
}

export default Home
