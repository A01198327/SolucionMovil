import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { GlobalStateProvider, useGlobalState } from './globalStateProvider';


export const App = () => {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/Inter.ttf"),
    InterBold: require("./assets/Inter-Bold.ttf"),
    NunitoSans: require("./assets/NunitoSans.ttf"),
    NunitoSansBold: require("./assets/NunitoSans-ExtraBold.ttf"),
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


  const GenerateReportScreen = () => {
    const [title, setTitle] = useState('');
    const [store, setStore] = useState('');
    const [branch, setBranch] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { state, dispatch } = useGlobalState();

    const handleGenerateReport = async (titulo, desc, tienda, sucursal, IdEmpleado) => {
      console.log('Generar reporte');
      try {
        const response = await axios.post('http://localhost:5000/insertReporte', {
          titulo: titulo,
          descripcion: desc,
          tienda: tienda,
          sucursal: sucursal,
          IdEmpleado: IdEmpleado,
        });
    
        console.log('Response data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error:', error);
        return { success: false, error: 'Error' };
      }
    };  
    
    const pickImage = async () => {
      const {status} = await ImagePicker.requestCameraPermissionsAsync();
      

      if (status != 'granted'){
        Alert.alert('error');
      }
      else{
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled){
          setFile(result.assets[0].uri);
          setError(null);
          console.log(result.assets[0].uri);
          getMax();
        }
      }
    }

    const getMax = async () => {
      fetch('http://localhost:5000/getMax')
        .then(response  => response.json())
        .then(data => console.log(data["data"][0]['']))
        .catch(error => console.log(error));
    }
    

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Genera tu reporte</Text>
        
        <Text style={styles.label}>Título (Descripción breve)</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Tienda</Text>
        <TextInput style={styles.input} value={store} onChangeText={setStore} />

        <Text style={styles.label}>Sucursal</Text>
        <TextInput style={styles.input} value={branch} onChangeText={setBranch} />

        <Text style={styles.label}>Describe la anomalía</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

        <TouchableOpacity style={styles.button} onPress={() => pickImage()}>
        <Text style={styles.buttonText2}>Agrega una imagen que apoye tu reporte</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => handleGenerateReport(title, description, store, branch, state.idEmpleado)}>
          <Text style={styles.buttonText}>Generar mi reporte</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HistoryScreen = () => {
    const [pendientes, setPendientes] = useState([]);
    const [aprobados, setAprobados] = useState([]);
    const [rechazados, setRechazados] = useState([]);
    const { state, dispatch } = useGlobalState();
    


    useEffect(() => {
      const fetchReportes = async () => {
        try{
          console.log(state.idEmpleado);
          const response = await fetch(`http://localhost:5000/reportesUsuario?IdEmpleado=${state.idEmpleado}`);
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

    // Aquí podrías tener lógica para obtener los reportes pendientes, aprobados y rechazados desde tu base de datos o donde los almacenes.

    return (
      <View style={styles.container}>
        <Text style={styles.header2}>Historial de Reportes</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Reportes</Text>
          {/* Aquí funciones de los reportes pendientes */}
          <View style={[styles.grayContainer, {height: '500px'}]}>
          {pendientes.map((reporte, index) => (
            <Text key={index} style={styles.title2}>
              {reporte.Titulo}
            </Text>
          ))}
          </View>
        </View>
        {/* 
        
        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Aprobados</Text>
          <View style={styles.grayContainer}>
          </View>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Rechazados</Text>
          <View style={styles.grayContainer}>
          </View>
        </View>
        */}
        
      </View>
    );
  };

  const RankingScreen = () => {
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
          const response = await fetch(`http://localhost:5000/getEmpleadoById?IdEmpleado=${state.idEmpleado}`);
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

    return (
      <View style={styles.container}>
        <Text style={styles.headerR}>Top Reporters</Text>
  
        <View style={styles.grayContainerR}>
          
        {usuarios.map((usuario, index) => (
          <div key={index}>
            <div style={{width: '49%', float: 'left'}}>
              <Text style={styles.title2}>
                {usuario.Nombre} 
              </Text>
            </div>
            <div style={{width: '49%', float: 'left', textAlign: 'center'}}>
              <Text style={[styles.title2]}>
                {usuario.Puntos} 
              </Text>
            </div>
          </div>
            
          ))}
        </View>
  
        <Text style={styles.labelR}>Tu</Text>
  
        <View style={styles.grayContainerR2}>
        {perfil?.map((perfil, index) => (
          <div key={index}>
            <div style={{width: '49%', float: 'left'}}>
              <Text style={styles.title2}>
                {perfil.Nombre} 
              </Text>
            </div>
            <div style={{width: '49%', float: 'left', textAlign: 'center'}}>
              <Text style={[styles.title2]}>
                {perfil.Puntos} 
              </Text>
            </div>
          </div>
            
          ))}
          
        </View>
      </View>
    );
  };

  const ProfileScreen = () => {
    const { state, dispatch } = useGlobalState();
    const [perfil, setPerfil] = useState();

    useEffect(() => {
      const getPerfil = async () =>{
        try {
          const response = await fetch(`http://localhost:5000/getEmpleadoById?IdEmpleado=${state.idEmpleado}`);
          const data = await response.json();
          setPerfil(data.data);
          
        } catch (error) {
          console.log('error', error);
        }
      };
      getPerfil(); 
    }, []);

    
    return (
      <View style={styles.container}>
        <Text style={styles.headerP}>Mi perfil</Text>
  
        <View style={styles.grayContainerP}>
          {perfil?.map((perfil, index) => (
            <div key={index}>
              <div style={{width: '49%', float: 'left'}}>
                <Text style={styles.title2}>
                  {perfil.Nombre} 
                </Text>
              </div>
              <div style={{width: '49%', float: 'left', textAlign: 'center'}}>
                <Text style={[styles.title2]}>
                  {perfil.Puntos} 
                </Text>
              </div>
            </div>
              
            ))}
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
    const [id, setId] = useState('');
    const { state, dispatch } = useGlobalState();

    const handleUpdateIdEmpleado = async (id) => {
      dispatch({ type: 'SET_ID_EMPLEADO', payload: id });
    };

    
    

    const handleLogin = async () => {
      const response = await fetch(`http://localhost:5000/login?username=${username}&passkey=${password}`);
      const data = await response.json();
      console.log(data.data);
      if (data.data.length > 0){
        console.log(data.data[0].IDEmpleado)
        setId(data.data[0].IDEmpleado);
        console.log(id);
        await handleUpdateIdEmpleado(data.data[0].IDEmpleado);
        console.log('Iniciando sesión');
        console.log(state.idEmpleado);
        navigation.navigate('Menu');
      }
      else{
        alert("Login not valid");
      }
      
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
          <Text>Contacto</Text>
          <Text>mkt@ejemplo.ejemplo.com</Text>
          <Text>+50 1 234 5678</Text>
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
      fontSize: 21,
      fontFamily: "Inter",

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
    <GlobalStateProvider>
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
    </GlobalStateProvider>
  );
};

export default App;
