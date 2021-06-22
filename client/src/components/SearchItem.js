import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import {Card,Row,Col,Container,Form,Button} from "react-bootstrap"

export default function SearchItem(props) {
        return (
            <>
            {props.items.map(dd =>{
                return(
                    <>
                    <Container style={{width: '60rem',backgroundColor:"#F8F9FA",textAlign: "center", margin: "auto", marginTop: "2rem" }}>
                        <Row>
                            <Col>
                            <Card style={{ width: '50rem',margin: "auto" }}>
                            
                                <Card.Header as="h5">Dr. {dd.name}</Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">Qualification : {dd.qualification}</Card.Subtitle>
                                    <Card.Subtitle className="mb-2 text-muted">Speciality : {dd.speciality}</Card.Subtitle>
                                    
                                </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        </Container>
                    
                        <br />
                    </> 
                )
            })}
            
             </>
        )
}
