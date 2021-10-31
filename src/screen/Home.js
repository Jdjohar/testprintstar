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

import {InterfaceType, discover, print} from "react-native-epson-printer";


const Home = props => {
    const [errorname, seterrorname] = useState('');
    const [printersarr, setprintersarr] = useState([]);

  //Fetch All Printers
  const portDiscovery = async () => {
    console.log('Test Print portDiscovery')
    try {
         const printerads =   await discover({interface_type: InterfaceType.LAN});
      setprintersarr(printerads);
      console.log(printersarr,  "Print Succdsfgess");
      // connect();
      // print();
    } catch (e) {
      console.error(e);
    }
  }

  // Coonect to Printer
  async function connect(port) {
    console.log(port, "Port")
    // port = "TCP:192.168.1.108";
    try {
      // for printing
const response = await print({
    printer: port,
    data: 'Test Print',
    receipt_copy_count: 1
  })
      console.log(typeof connect, "printer"); // Printer Connected!
    
      // const gh = JSON.stringify(connect);
      // var ghparse = JSON.parse(gh);
    //   seterrorname(response);
    //    if (connect == "Printer Connected")
    //    {
        Alert.alert(response);
        //    AsyncStorage.setItem('printerportncumber', port); // trying to save port number in async storage
    //    }
      //  var getprinterport = AsyncStorage.getItem('printerportncumber');
      //  seterrorname(getprinterport);
       
      

    } catch (e) {
      var gh = JSON.stringify(e.message);
      console.error(gh, "abcddk");
      Alert.alert(gh);
      // seterrorname(JSON.stringify(e.message));
    }
  }
  

  const list = () => {
    return printersarr.map((element) => {
      return (
        <View key={element.mac_address} style={{margin: 10}}>
          <Text>{element.name}</Text>
          <Text>{element.mac_address}</Text>
          <Text>{element.target}</Text>
          <Text>{element.interface_type}</Text>
      <TouchableOpacity  onPress={() => connect(element)}>
        <Text style={{padding:10, backgroundColor:'#222', color:'#fff', width:"40%", textAlign:'center'}}>click to connect</Text>
      </TouchableOpacity>
         
        </View>
      );
    });
  };





    


return (
    <View style={styles.container}>

<View style={{paddingLeft: 10, paddingBottom: 10, paddingTop: 10}}>
   
    <Text style={{fontSize: 20}}>{errorname}</Text>
  </View>

  <View style={{marginBottom:30}}> 

    {/* {k.macAddress} {k.portName} {k.USBSerialNumber} */}
  {list()}
  </View>
  
  <TouchableOpacity 
  onPress={()=>portDiscovery()}>
    <Text style={{backgroundColor:"#03a9f4", color:"#fff",  padding:10}}>Fetch Printers</Text>

  </TouchableOpacity>
 
  <TouchableOpacity 
  onPress={()=>props.navigation.navigate("Home")}>
    <Text style={{backgroundColor:"#222", padding:10, color:"#fff"}}>Go To Home</Text>

  </TouchableOpacity>
        
   
    
   
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
export default Home;