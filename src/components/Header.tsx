import { Container, Navbar } from 'react-bootstrap'

export function Header() {
    return (
        <Navbar sticky='top' bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/">Online Shopping Store</Navbar.Brand>
            </Container>
        </Navbar>
    )
}