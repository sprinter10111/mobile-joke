import React, { Component } from 'react';
import { Text} from 'react-native';
import {styles} from '../styles/footer';
 
class Footer extends Component {
  render() {
    return (
        <Text style={styles.footer}>This is Footer component.</Text>
    );
  }
}
 
export default Footer;

