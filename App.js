import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Button, Alert, Modal} from 'react-native';
import { TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WebView } from 'react-native-webview';
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as WebBrowser from 'expo-web-browser';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { GlobalStateProvider, useGlobalState } from './globalStateProvider';
import { Platform } from 'react-native';



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
  const stores = ['Liverpool', 'Sears', 'Coppel', 'Sanborns']; 

  const branches = ['San Geronimo', 'Paseo la Fe', 'Esfera', 'Nuevo Sur']


  const GenerateReportScreen = () => {
    const [title, setTitle] = useState('');
    const [store, setStore] = useState('Seleccione la tienda');
    const [branch, setBranch] = useState('Seleccione la sucursal');
    const [description, setDescription] = useState('');
    const [modalVisibleStore, setModalVisibleStore] = useState(false);
    const [modalVisibleBranch, setModalVisibleBranch] = useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [maxReportes, setMaxReportes] = useState(null);
    const { state, dispatch } = useGlobalState();

    useEffect(() => {
      const fetchReportes = async () => {
        try{
          getMax();
        }
        catch (error){
          console.log('error', error)
        }
      };

      getMax();   
    }, []);

    const handleGenerateReport = async (titulo, desc, tienda, sucursal, IdEmpleado) => {
      console.log('Generar reporte');
      try {
        const response = await axios.post(`${state.direccion}/insertReporte`, {
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
      try {
        getMax();
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          console.log(maxReportes);
          const formData = new FormData();
          const localUri = result.assets[0].uri;
          const fileName = localUri.split('/').pop();
          const match = /\.(w+)$/.exec(fileName);
          const type = match ? `${match[1]}` : `jpg`;
          uploadImage(localUri, fileName);
                
        {/* await FileSystem.uploadAsync('${state.direccion}/insertImage', localUri, {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file'
          });
        */}
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const uploadImage = async (imageUri, filename) => {
      try {
          let formData = new FormData();
          let file;
  
          if (Platform.OS === 'web') {
              const response = await fetch(imageUri);
              const blob = await response.blob();
              file = new File([blob], `image${maxReportes + 1}.jpg`);
              formData.append('file', file);
              const uploadResponse = await fetch(`${state.direccion}/insertImage`, {
                  method: 'POST',
                  body: formData,
          });
          if (uploadResponse.ok) {
            const responseData = await uploadResponse.json();
            console.log('Upload successful:', responseData);
        } else {
            console.error('Upload failed:', uploadResponse.statusText);
        }
  
          } else {
              await FileSystem.uploadAsync(`${state.direccion}/insertImage`, imageUri, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file'
              });
          }
  
          
          
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  };
  


    

    const getMax = async () => {
      fetch(`${state.direccion}/getMax`)
        .then(response  => response.json())
        .then(data => setMaxReportes(data["data"][0]['']))
        .catch(error => console.log(error));
          }
    

          return (
            <View style={styles.container}>
              <Text style={styles.header2}>Genera tu reporte</Text>
              
              <Text style={styles.label}>Título (Descripción breve)</Text>
              <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      
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
          const response = await fetch(`${state.direccion}/reportesUsuario?IdEmpleado=${state.idEmpleado}`);
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
            <Text key={index} style={styles.label}>
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
          const response = await fetch(`${state.direccion}/getEmpleados`);
          const data = await response.json();
          console.log(data);
          setUsuarios(data.data);        }
        catch (error){
          console.log('error', error)
        }
      };

      const getPerfil = async () =>{
        try {
          const response = await fetch(`${state.direccion}/getEmpleadoById?IdEmpleado=${state.idEmpleado}`);
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
            <View key={index} style={{ flexDirection: 'row' }}>
              <View style={{ width: '49%' }}>
                <Text style={styles.title2}>
                  {usuario.Nombre}
                </Text>
              </View>
              <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title2}>
                  {usuario.Puntos}
                </Text>
              </View>
            </View>
          ))}
        </View>
  
        <Text style={styles.labelR}>Tu</Text>
  
        <View style={styles.grayContainerR2}>
          {perfil?.map((perfil, index) => (
            <View key={index} style={{ flexDirection: 'row' }}>
              <View style={{ width: '49%' }}>
                <Text style={styles.title2}>
                  {perfil.Nombre}
                </Text>
              </View>
              <View style={{ width: '49%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.title2}>
                  {perfil.Puntos}
                </Text>
              </View>
            </View>
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
          const response = await fetch(`${state.direccion}/getEmpleadoById?IdEmpleado=${state.idEmpleado}`);
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
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title2}>
                {perfil.Nombre}
              </Text>
              <Text style={styles.title2}>
                {perfil.Puntos}
              </Text>
            </View>
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
    const { state, dispatch } = useGlobalState();
    const unityHTMLUrl = `https://server-whirlcheck.onrender.com/game/index.html`;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Peak Gaming</Text>
        <TouchableOpacity style={styles.button} onPress={async () => WebBrowser.openBrowserAsync(unityHTMLUrl)}>
                <Text style={styles.buttonText}>Abrir el Juego</Text>
        </TouchableOpacity>
      </View>
    );
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
        await handleUpdateIdEmpleado(1);
        console.log('Iniciando sesión');
        console.log(state.idEmpleado);
        console.log(state.direccion);
        console.log(state.puerto);
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
      alignSelf: 'center',
      padding: 10,
      borderRadius: 10,
      width: 350,
      height: 150, 
      paddingLeft: 0
    },
    grayContainerR: {
      backgroundColor: '#dbd6d6',
      alignSelf: 'center',
      marginTop: 20,
      padding: 10,
      borderRadius: 10,
      width: 350,
      height: 380, 
      paddingLeft: 0
    },

    grayContainerR2: {
      backgroundColor: '#dbd6d6',
      alignSelf: 'center',
      padding: 10,
      borderRadius: 10,
      width: 350,
      height: 150, 
      paddingLeft: 0
    },
    grayContainerP: {
      backgroundColor: '#dbd6d6',
      alignSelf: 'flex-start',
      borderRadius: 10,
      marginTop: 20,
      width: 350,
      height: 110 
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
