import React, { Component } from "react";
import { Button, Form, Container, Header, Segment, Label, Image, Card, Grid, Icon } from 'semantic-ui-react'

const extra = (
    <a>
      <Icon name='mail' />
      John.doe@gmail.com
    </a>
  )

class Edition extends Component {
    
    render() {
        return (
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <Card
                        columns={3}
                        image='/media/logo.svg'
                        header='John Doe'
                        meta='inscrit le 10/03/2017'
                        extra={extra}
                        fluid
                        />  
                    </Grid.Column>
                    <Grid.Column>
                            <Form  size='large'>

                                <Form.Group unstackable widths={2}>
                                    <Form.Input 
                                    value="John"
                                    icon='user' 
                                    iconPosition='left' 
                                    label='First name' 
                                    placeholder='First name' />
                                    <Form.Input 
                                    value="Doe"
                                    icon='user' 
                                    iconPosition='left' 
                                    label='Last name' 
                                    placeholder='Last name' />
                                </Form.Group>

                                <Form.Group widths={2}>
                                    <Form.Input 
                                    value="John.doe@gmail.com"
                                    icon='mail' 
                                    iconPosition='left' 
                                    label='E-mail' 
                                    placeholder='e-mail' 
                                    />
                                    <Form.Input 
                                    icon='unlock alternate' 
                                    iconPosition='left' 
                                    type="password" 
                                    label='Password' 
                                    placeholder='Password' 
                                    />
                                </Form.Group>

                                    <Form.Input 
                                    className="Token"
                                    style={{ display: 'none' }}
                                    />
                                    <Button 
                                    color='teal' 
                                    fluid size='large'
                                    type='submit'>
                                    Modify
                                    </Button>                   
                                </Form>
                         </Grid.Column> 
                    </Grid.Row>
                </Grid>      
        );
    }
}
    
export default Edition;