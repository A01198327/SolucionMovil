import React, { useState } from 'react';
<<<<<<< Updated upstream
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
=======
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Button, Alert, Modal} from 'react-native';
>>>>>>> Stashed changes
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';   
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from 'react';
<<<<<<< Updated upstream
=======
import { TouchableHighlight } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { GlobalStateProvider, useGlobalState } from './globalStateProvider';

>>>>>>> Stashed changes

export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/Fonts/Inter.ttf"),
    InterBold: require("./assets/Fonts/Inter-Bold.ttf"),
    NunitoSans: require("./assets/Fonts/NunitoSans.ttf"),
    NunitoSansBold: require("./assets/Fonts/NunitoSans-ExtraBold.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    } 
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

<<<<<<< Updated upstream
=======
  const stores = ['Liverpool', 'Sears', 'Coppel', 'Sanborns']; 

  const branches = ['San Geronimo', 'Paseo la Fe', 'Esfera', 'Nuevo Sur']

>>>>>>> Stashed changes
  const GenerateReportScreen = () => {
    const [title, setTitle] = useState('');
    const [store, setStore] = useState('Seleccione la tienda');
    const [branch, setBranch] = useState('Seleccione la sucursal');
    const [description, setDescription] = useState('');
<<<<<<< Updated upstream
=======
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { state, dispatch } = useGlobalState();
    const [modalVisibleStore, setModalVisibleStore] = useState(false);
    const [modalVisibleBranch, setModalVisibleBranch] = useState(false);
    
>>>>>>> Stashed changes

    const handleGenerateReport = () => {
      console.log('Generar reporte');
      // Aquí  agregar la lógica para generar el reporte
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header2}>Genera tu reporte</Text>
        
        <Text style={styles.label}>Título (Descripción breve)</Text>
        <TextInput style={styles.inputreport} value={title} onChangeText={setTitle} />

<<<<<<< Updated upstream
        <Text style={styles.label2}>Tienda</Text>
        <TextInput style={styles.inputreport} value={store} onChangeText={setStore} />

        <Text style={styles.label2}>Sucursal</Text>
        <TextInput style={styles.inputreport} value={branch} onChangeText={setBranch} />

        <Text style={styles.label2}>Describe la anomalía</Text>
        <TextInput style={styles.inputreport2} value={description} onChangeText={setDescription} multiline />

        <Text style={styles.label2}>Agrega una imagen que apoye tu reporte</Text>
        {/* Aquí  agregar un componente para subir imágenes */}

        <TouchableOpacity style={styles.buttonreport} onPress={handleGenerateReport}>
=======
        <Text style={styles.label}>Tienda</Text>
        <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisibleStore}
  onRequestClose={() => {
    setModalVisibleStore(!modalVisibleStore);
  }}
>
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }}>
    <View style={{
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    }}>
      {stores.map((store, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => {
            setStore(store);
            setModalVisibleStore(!modalVisibleStore);
          }}
        >
          <Text style={{fontSize: 20, marginBottom: 20,}}>{store}</Text>
        </TouchableHighlight>
      ))}
    </View>
  </View>
</Modal>

<TouchableOpacity 
  style={styles.inputb} 
  onPress={() => setModalVisibleStore(true)}
>
  <Text style={{fontSize: 20}}>{store}</Text>
</TouchableOpacity>

      <Text style={styles.label}>Sucursal</Text>
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisibleBranch}
  onRequestClose={() => {
    setModalVisibleBranch(!modalVisibleBranch);
  }}
>
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }}>
    <View style={{
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    }}>
      {branches.map((branch, index) => (
        <TouchableHighlight
          key={index}
          onPress={() => {
            setBranch(branch);
            setModalVisibleBranch(!modalVisibleBranch);
          }}
        >
          <Text style={{fontSize: 20, marginBottom: 20}}>{branch}</Text>
        </TouchableHighlight>
      ))}
    </View>
  </View>
</Modal>
<TouchableOpacity 
  style={styles.inputb} 
  onPress={() => setModalVisibleBranch(true)}
>
  <Text style={{fontSize: 20}}>{branch}</Text>
</TouchableOpacity>

        <Text style={styles.label}>Describe la anomalía</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription}/>

        <TouchableOpacity style={styles.button2} onPress={() => pickImage()}>
        <Text style={styles.buttonText2}>Agrega una imagen</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => handleGenerateReport(title, description, store, branch, 1)}>
>>>>>>> Stashed changes
          <Text style={styles.buttonText}>Generar mi reporte</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HistoryScreen = () => {
    const [pendientes, setPendientes] = useState([]);
    const [aprobados, setAprobados] = useState([]);
    const [rechazados, setRechazados] = useState([]);
<<<<<<< Updated upstream
=======
    const { state, dispatch } = useGlobalState();
    


    useEffect(() => {
      const fetchReportes = async () => {
        try{
          console.log(state.idEmpleado);
          const response = await fetch(`http://localhost:5000/reportesUsuario?IdEmpleado= 1`);
          const data = await response.json();
          console.log(data);
          const pendientesData = data.data.filter(report => report.Estatus === 'Abierto');
          setPendientes(pendientesData);
          console.log("Pendientes:", pendientesData);
        }
        catch (error){
          console.log('error', error)
        }
      };

      fetchReportes();   
    }, []);
>>>>>>> Stashed changes

    // Aquí podrías tener lógica para obtener los reportes pendientes, aprobados y rechazados desde tu base de datos o donde los almacenes.

    return (
      <View style={styles.container}>
        <Text style={styles.header2}>Historial de Reportes</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Pendientes</Text>
          {/* Aquí funciones de los reportes pendientes */}
          <View style={styles.grayContainer}>
            {/* Contenedor  para los reportes pendientes */}
          </View>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Aprobados</Text>
          {/* Aquí funciones de los reportes aprobados */}
          <View style={styles.grayContainer}>
            {/* Contenedor  para los reportes aprobados */}
          </View>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Rechazados</Text>
          {/* Aquí funciones de los reportes rechazados */}
          <View style={styles.grayContainer}>
            {/* Contenedor  para los reportes rechazados */}
          </View>
        </View>
      </View>
    );
  };

  const RankingScreen = () => {
<<<<<<< Updated upstream
=======
    const [usuarios, setUsuarios] = useState([]);
    const [perfil, setPerfil] = useState();
    const { state, dispatch } = useGlobalState();
    


    useEffect(() => {
      const fetchUsuarios = async () => {
        try{
          //console.log(state.idEmpleado);
          const response = await fetch(`http://localhost:5000/getEmpleados`);
          const data = await response.json();
          console.log(data);
          setUsuarios(data.data);        }
        catch (error){
          console.log('error', error)
        }
      };

      const getPerfil = async () =>{
        try {
          const response = await fetch(`http://localhost:5000/getEmpleadoById?IdEmpleado= 1`);
          const data = await response.json();
          setPerfil(data.data);
          console.log(perfil);
          
        } catch (error) {
          console.log('error', error);
        }
      };

      fetchUsuarios();
      getPerfil(); 
    }, []);

>>>>>>> Stashed changes
    return (
      <View style={styles.container}>
        <Text style={styles.headerR}>Top Reporters</Text>
  
        <View style={styles.grayContainerR}>
          {/* Contenedor  para Top Reporters */}
        </View>
  
        <Text style={styles.labelR}>Tu</Text>
  
        <View style={styles.grayContainerR2}>
          {/* Contenedor  para tu reporte */}
        </View>
      </View>
    );
  };

  const ProfileScreen = () => {
<<<<<<< Updated upstream
=======
    const { state, dispatch } = useGlobalState();
    const [perfil, setPerfil] = useState();

    useEffect(() => {
      const getPerfil = async () =>{
        try {
          const response = await fetch(`http://localhost:5000/getEmpleadoById?IdEmpleado=1`);
          const data = await response.json();
          setPerfil(data.data);
          
        } catch (error) {
          console.log('error', error);
        }
      };
      getPerfil(); 
    }, []);

    
>>>>>>> Stashed changes
    return (
      <View style={styles.container}>
        <Text style={styles.headerP}>Mi perfil</Text>
  
        <View style={styles.grayContainerP}>
          {/* Contenedor  para Top Reporters */}
        </View>
  
        <Text style={styles.labelP}>Mis logros</Text>
  
        <View style={styles.grayContainerR}>
          {/* Contenedor  para tu reporte */}
        </View>
      </View>
    );
  };

  const GameScreen = () => {
    return <Text>Esta es la pantalla de Minijuego</Text>;
  };

  const HomeScreen = ({ navigation }) => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title2}>Bienvenido</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report')}>
            <Text style={styles.buttonText}>Generar un reporte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={() => navigation.navigate('History')}>
            <Text style={styles.buttonText2}>Historial de reportes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={() => navigation.navigate('Ranking')}>
            <Text style={styles.buttonText2}>Ranking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText2}>Mi perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGray} onPress={() => navigation.navigate('Game')}>
            <Text style={styles.buttonText2}>Minijuego</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>Contacto</Text>
          <Text>mkt@ejemplo.ejemplo.com</Text>
          <Text>+50 1 234 5678</Text>
        </View>
      </ScrollView>
    );
  };

  const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      console.log('Iniciando sesión');
      navigation.navigate('Menu');
    };

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground source={require('./assets/imgb.png')} style={styles.container}>
          <Text style={styles.title}>Report admin</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
    console.log('Olvidé mi contraseña');
  }}>
    <Text style={styles.link}>Olvidé mi contraseña</Text>
  </TouchableOpacity>
        </ImageBackground>
        <View style={styles.footer}>
          <Text style={styles.footertext1}>Contacto</Text>
          <Text style={styles.footertext2}>mkt@ejemplo.ejemplo.com</Text>
          <Text style={styles.footertext3}>+50 1 234 5678</Text>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      fontFamily: "NunitoSansBold",
      marginBottom: 20,
    },
    header2: {
      fontSize: 30,
      fontFamily: "NunitoSansBold",
      alignSelf: 'flex-start',
      marginLeft: 0,
      marginTop: -100,
      paddingLeft: 45,
    },
    headerR: {
      fontSize: 30,
      fontFamily: "NunitoSansBold",
      marginLeft: 0,
      marginTop: -110,
    },
    headerP: {
      fontSize: 30,
      fontFamily: "NunitoSansBold",
      alignSelf: 'flex-start',
      marginLeft: 0,
      marginTop: -30,
      paddingLeft: 25,
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      width: '105%',
      height: '105%',
      resizeMode: 'cover',
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontFamily: "NunitoSansBold",
    },
    title2: {
      fontSize: 24,
      marginBottom: 20,
      fontFamily: "NunitoSansBold",
      
    },
    input: {
      color: 'black',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 20,
      width: '80%',
      fontFamily: "InterBold",
      marginTop: 10,
    },
    inputb: {
      color: 'black',
      height: 35,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 20,
      width: '80%',
      fontFamily: "InterBold",
      alignItems: 'center',
      marginTop: 10,
    },
    inputreport: {
      color: 'black',
      height: 40,
      borderColor: '#dbd6d6',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 0,
      width: '80%',
      fontFamily: "InterBold",
      backgroundColor: '#dbd6d6'
    },

    inputreport2: {
      height: 100,
      borderColor: '#dbd6d6',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 0,
      width: '80%',
      fontFamily: "InterBold",
      backgroundColor: '#dbd6d6'
    },
    label: {
      color: 'black',
      marginTop: 25,
      fontFamily: "Inter",
      fontSize: 18,
      alignSelf: 'flex-start',
      paddingLeft: 45
    },

    label2: {
      color: 'black',
      marginTop: 0,
      fontFamily: "Inter",
      fontSize: 18,
      alignSelf: 'flex-start',
      paddingLeft: 45
    },
  
    link: {
      color: 'blue',
      marginTop: 0,
    },
    button: {
      backgroundColor: '#EDAC09', 
      padding: 10,
      borderRadius: 15, 
      alignItems: 'center',
      marginBottom: 20,
      width: '80%', 
      height: 50, 
    },

    button2: {
      backgroundColor: '#dbd6d6', 
      padding: 10,
      borderRadius: 15, 
      alignItems: 'center',
      marginBottom: 20,
      width: '80%', 
      height: 50, 
      marginTop: 15,
    },

    buttonreport: {
      backgroundColor: '#EDAC09', 
      padding: 10,
      borderRadius: 15, 
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
      width: '80%', 
      height: 50, 
    },
    buttonGray: {
      backgroundColor: '#dbd6d6', 
      padding: 10,
      borderRadius: 15, 
      alignItems: 'center',
      marginBottom: 20,
      width: '80%', 
      height: 50, 
    },
    buttonText: {
      color: '#fff',
      fontSize: 22,
      fontFamily: "InterBold",
    },
    buttonText2: {
      color: 'black',
      fontSize: 22,
      fontFamily: "InterBold",
    },
    footer: {
      marginTop: 0,
      backgroundColor: '#bdb7b7',
      padding: 10,
      color: '#fff', 
    },
    footertext1: {
      color: 'black',
      fontSize: 15,
      fontFamily: "InterBold",
    },
    footertext2: {
      color: 'black',
      fontSize: 12,
      fontFamily: "Inter",
    }, 
    footertext3: {
      color: 'black',
      fontSize: 12,
      fontFamily: "Inter",
      alignItems: 'right',
    },
    labelH: {
      color: 'black',
      alignSelf: 'flex-start',
      marginTop: 20,
      marginBottom: 5,
      fontFamily: "Inter",
      fontSize: 20,
      paddingLeft: 0
    },
    labelR: {
      color: 'black',
      alignSelf: 'flex-start',
      marginTop: 20,
      marginBottom: 10,
      fontFamily: "InterBold",
      fontSize: 25,
      paddingLeft: 27
    },
    labelP: {
      color: 'black',
      alignSelf: 'flex-start',
      marginTop: 35,
      fontFamily: "InterBold",
      fontSize: 30,
      paddingLeft: 25
    },
    subtitleContainer: {
      alignSelf: 'flex-start',
      marginTop: 20,
      paddingLeft: 45
    },
    grayContainer: {
      backgroundColor: '#dbd6d6',
      alignSelf: 'flex-start',
      padding: 10,
      borderRadius: 10,
      width: 300,
      height: 90, 
      paddingLeft: 0
    },
    grayContainer2: {
      backgroundColor: '#dbd6d6',
      alignSelf: 'flex-start',
      padding: 10,
      borderRadius: 10,
      width: 350,
      height: 150, 
      paddingLeft: 45
    },
    grayContainerR2: {
      backgroundColor: '#dbd6d6',
      borderRadius: 10,
      width: 350,
      height: 110 
    },
    grayContainerP: {
      backgroundColor: '#dbd6d6',
      borderRadius: 10,
      marginTop: 20,
      width: 350,
      height: 110 
    },
    grayContainerR: {
      backgroundColor: '#dbd6d6',
      borderRadius: 10,
      marginTop: 20,
      width: 350,
      height: 380, 

    },
  });

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Menu" component={HomeScreen} />
        <Stack.Screen name="Report" component={GenerateReportScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Ranking" component={RankingScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
