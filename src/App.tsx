import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Cart } from './components/Cart'
import { MainPane } from './components/MainPane'
import { ShoppingCartProvider } from './context/CartContext'

function App() {
    return (
        <ShoppingCartProvider>
            <Container fluid className="px-0">
                <Header />
                <Row className='mx-0'>
                    <Col xs={2} className="bg-light p-3"><Sidebar /></Col>
                    <Col xs={7}><MainPane /></Col>
                    <Col xs={3} className="p-3"><Cart /></Col>
                </Row>
            </Container>
        </ShoppingCartProvider>
    )
}

export default App
