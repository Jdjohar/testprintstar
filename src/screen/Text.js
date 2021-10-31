import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {discover, print} from "react-native-epson-printer";


const Textpage = props => {
    const [errorname, seterrorname] = useState('');
    const [printersarr, setprintersarr] = useState([]);

     //Fetch All Printers
  const portDiscovery = async () => {
    console.log('Test Print portDiscovery')
    try {
        const printerads = await discover({interface_type: InterfaceType.LAN});
      setprintersarr(printerads);
      console.log(printersarr,  "Print Succdsfgess");
      // connect();
      // print();
    } catch (e) {
      console.error(e);
    }
  }
  
return (
<View style={styles.container}>
<Text>Text</Text>
</View>
)
};


const styles = StyleSheet.create({
container: {
  padding: 5,
  width: '100%',
  height: '100%',
  backgroundColor: '#eee',
}
});  
export default Textpage;