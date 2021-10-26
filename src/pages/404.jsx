import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

class NotFound extends React.Component {
    render() {
        return (
            <div style={styles.root}>
                <h1 style={styles.title}>404</h1>
                <h1>Ooops!, page not found.</h1>
                <Link to='/' style={styles.link}>
                    <Button style={styles.button}>Back to Home</Button>
                </Link>
            </div>
        )
    }
}

const styles = {
    root: {
        height: 'calc(100vh - 70px)',
        width: '100%',
        padding: '90px 10% 3% 10%',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 100,
        marginBottom: '3%'
    },
    link: {
        marginTop: '2%',
        textDecoration: 'none'
    }
}

export default NotFound