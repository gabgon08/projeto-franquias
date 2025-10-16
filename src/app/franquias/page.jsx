'use client'

import React, { useState, useEffect } from 'react'
import styles from './franquias.module.css'

function Franquias() {

    const [franquias, setFranquias] = useState([])

    const [loading, setLoading] = useState(true)

    async function CarregarFranquias(params) {
        console.log('BUSCAR FRANQUIAS')
        setLoading(false)

        useEffect(() => {
            CarregarFranquias()
        }, [])
    }

    return (
        <div className={styles.main}>
            <h1>FRANQUIAS</h1>
            <p>{JSON.stringify(franquias)}</p>
        </div>
    )
}

export default Franquias
