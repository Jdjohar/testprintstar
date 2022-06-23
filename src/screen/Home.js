import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TouchableOpacity
} from 'react-native';
import {
  InterfaceType,
  StarDeviceDiscoveryManager,
  StarDeviceDiscoveryManagerFactory,
  StarPrinter,
  StarConnectionSettings,
  StarXpandCommand
} from 'react-native-star-io10';



const Home = props => {
    const [errorname, seterrorname] = useState('');
    const [printersarr, setprintersarr] = useState([]);

    //  manager:StarDeviceDiscoveryManager = null;

  //Fetch All Printers
  const portDiscovery = async () => {
    console.log('Test Print portDiscovery')
    try {
      // Specify your printer interface types.
      var manager = await StarDeviceDiscoveryManagerFactory.create([
          InterfaceType.Lan
      ]);

      // Set discovery time. (option)
      manager.discoveryTime = 10000;

      // Callback for printer found.
      manager.onPrinterFound = (printer) => {
          console.log(printer);
      };

      // Callback for discovery finished. (option)
      manager.onDiscoveryFinished = () => {
          console.log(`Discovery finished.`);
      };

      // Start discovery.
      await manager.startDiscovery();

      // Stop discovery.
      // await manager.stopDiscovery()
  }
  catch(error) {
      // Error.
      console.log(error);
  }
  }

  // Coonect to Printer
  async function connect(port) {
    console.log(port, "Port")
    // port = "TCP:192.168.1.108";
    try {

const response = await print({
    printer: port,
    data:  '<![CDATA[<font size="20">Text in bigger font size 20.. </font><font size="10">Text in normal font size 10</font>]]>',
    receipt_copy_count: 1
  })
      console.log(typeof connect, "printer"); // Printer Connected!

        Alert.alert(response);

    } catch (e) {
      var gh = JSON.stringify(e.message);
      console.error(gh, "abcddk");
      Alert.alert(gh);
      // seterrorname(JSON.stringify(e.message));
    }
  }
  async function getStatus(){
    // Specify your printer connection settings.
    var settings = new StarConnectionSettings();
    settings.interfaceType = InterfaceType.Lan;
    settings.identifier = "00:11:62:40:71:8B";
    settings.autoSwitchInterface = true;
    settings.openCloseSignal = true;

    var printer = new StarPrinter(settings);
    // Callback for printer state changed.
    printer.printerDelegate.onReady = () => {
      console.log(`Printer: Ready`);
  }
  printer.drawerDelegate.onOpenCloseSignalSwitched = (openCloseSignal) => {
      console.log(`Drawer: Open Close Signal Switched: ${String(openCloseSignal)}`);
  }
  printer.inputDeviceDelegate.onDataReceived = (data) => {
      console.log(`Input Device: DataReceived ${String(data)}`);
  }
  printer.displayDelegate.onConnected = () => {
      console.log(`Display: Connected`);
  }

    try {
        // Connect to the printer.
        await printer.open();

        // Get printer status.
        var status = await printer.getStatus();
        console.log(status, "staus ");
    }
    catch(error) {
        // Error.
        console.log(error);
    }
    finally {
        // Disconnect from the printer and dispose object.
        await printer.close();
        await printer.dispose();
    }
}
  async function newspprint() {
    // Specify your printer connection settings.
    var settings = new StarConnectionSettings();
    settings.interfaceType = InterfaceType.Lan;
    settings.identifier = "00:11:62:40:71:8B";
    var printer = new StarPrinter(settings);

    try {
        // Connect to the printer.
        await printer.open();
    console.log(printer);

       // Create printing data using StarXpandCommandBuilder object.
var builder = new StarXpandCommand.StarXpandCommandBuilder();
builder.addDocument(new StarXpandCommand.DocumentBuilder()
.addPrinter(new StarXpandCommand.PrinterBuilder()
    .styleInternationalCharacter(StarXpandCommand.Printer.InternationalCharacterType.Usa)
    .styleCharacterSpace(0)
    .styleAlignment(StarXpandCommand.Printer.Alignment.Center)
    .actionPrintText("Star Clothing Boutique\n" +
                    "123 Star Road\n" +
                    "City, State 12345\n" +
                    "\n")
    .styleAlignment(StarXpandCommand.Printer.Alignment.Left)
    .actionPrintText("Date:MM/DD/YYYY    Time:HH:MM PM\n" +
                    "--------------------------------\n" +
                    "\n")
    .actionPrintText("SKU         Description    Total\n" +
                    "300678566   PLAIN T-SHIRT  10.99\n" +
                    "300692003   BLACK DENIM    29.99\n" +
                    "300651148   BLUE DENIM     29.99\n" +
                    "300642980   STRIPED DRESS  49.99\n" +
                    "300638471   BLACK BOOTS    35.99\n" +
                    "\n" +
                    "Subtotal                  156.95\n" +
                    "Tax                         0.00\n" +
                    "--------------------------------\n")
    .actionPrintText("Total     ")
    .add(new StarXpandCommand.PrinterBuilder()
        .styleMagnification(new StarXpandCommand.MagnificationParameter(2, 2))
        .actionPrintText("   $156.95\n")
    )
    .actionPrintText("--------------------------------\n" +
                    "\n" +
                    "Charge\n" +
                    "156.95\n" +
                    "Visa XXXX-XXXX-XXXX-0123\n" +
                    "\n")
    .add(new StarXpandCommand.PrinterBuilder()
        .styleInvert(true)
        .actionPrintText("Refunds and Exchanges\n")
    )
    .actionPrintText("Within ")
    .add(new StarXpandCommand.PrinterBuilder()
        .styleUnderLine(true)
        .actionPrintText("30 days")
    )
    .actionPrintText(" with receipt\n")
    .actionPrintText("And tags attached\n" +
                    "\n")
    .styleAlignment(StarXpandCommand.Printer.Alignment.Center)
    .actionPrintBarcode(new StarXpandCommand.Printer.BarcodeParameter('0123456',
                        StarXpandCommand.Printer.BarcodeSymbology.Jan8)
                        .setBarDots(3)
                        .setBarRatioLevel(StarXpandCommand.Printer.BarcodeBarRatioLevel.Level0)
                        .setHeight(5)
                        .setPrintHri(true))
    .actionFeedLine(1)
    .actionPrintQRCode(new StarXpandCommand.Printer.QRCodeParameter('Hello World.\n')
                        .setModel(StarXpandCommand.Printer.QRCodeModel.Model2)
                        .setLevel(StarXpandCommand.Printer.QRCodeLevel.L)
                        .setCellSize(8))
    .actionCut(StarXpandCommand.Printer.CutType.Partial)
    )
);

// Get printing data from StarXpandCommandBuilder object.
var commands = await builder.getCommands();

        // Print.
        await printer.print(commands);
    }
    catch(error) {
        // Error.
        console.log(error, "error ");
    }
    finally {
        // Disconnect from the printer and dispose object.
        await printer.close();
        await printer.dispose();
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
  onPress={()=>newspprint()}>
    <Text style={{backgroundColor:"#03a9f4", color:"#fff",  padding:10}}>Test Printers</Text>

  </TouchableOpacity>
  
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