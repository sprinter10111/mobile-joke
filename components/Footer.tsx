import React, { Component } from 'react';
import { Text} from 'react-native';
import {styles} from '../styles/footer';
 
class Footer extends Component {
  render() {
    return (
        <Text style={styles.footer}>If you want a real joke, open the front facing camera.</Text>
    );
  }
}
 
export default Footer;

