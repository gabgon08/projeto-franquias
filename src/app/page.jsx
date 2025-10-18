import React from 'react'
import styles from './page.module.css'
import common from './../theme/common.module.css'

function Home() {
  return (
    <div className={common.container}>

      <div className={styles.main}>
        <p>The Fate of Ophelia</p>
        <p>Actually Romantic</p>
        <p>Elizabeth Taylor</p>
      </div>

    </div>
  )
}

export default Home
