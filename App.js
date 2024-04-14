import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font'; 
import * as SplashScreen from 'expo-splash-screen'; 
import { useEffect } from 'react';

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

  const GenerateReportScreen = () => {
    const [title, setTitle] = useState('');
    const [store, setStore] = useState('');
    const [branch, setBranch] = useState('');
    const [description, setDescription] = useState('');

    const handleGenerateReport = () => {
      console.log('Generar reporte');
      // Aquí  agregar la lógica para generar el reporte
    };

    return (
      <View style={styles.container}>
        <Text style={styles.header2}>Genera tu reporte</Text>
        
        <Text style={styles.label}>Título (Descripción breve)</Text>
        <TextInput style={styles.inputreport} value={title} onChangeText={setTitle} />

        <Text style={styles.label2}>Tienda</Text>
        <TextInput style={styles.inputreport} value={store} onChangeText={setStore} />

        <Text style={styles.label2}>Sucursal</Text>
        <TextInput style={styles.inputreport} value={branch} onChangeText={setBranch} />

        <Text style={styles.label2}>Describe la anomalía</Text>
        <TextInput style={styles.inputreport2} value={description} onChangeText={setDescription} multiline />

        <Text style={styles.label2}>Agrega una imagen que apoye tu reporte</Text>
        {/* Aquí  agregar un componente para subir imágenes */}

        <TouchableOpacity style={styles.buttonreport} onPress={handleGenerateReport}>
          <Text style={styles.buttonText}>Generar mi reporte</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HistoryScreen = () => {
    const [pendientes, setPendientes] = useState([]);
    const [aprobados, setAprobados] = useState([]);
    const [rechazados, setRechazados] = useState([]);

    // Aquí podrías tener lógica para obtener los reportes pendientes, aprobados y rechazados desde tu base de datos o donde los almacenes.

    return (
      <View style={styles.container}>
        <Text style={styles.header2}>Historial de Reportes</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Pendientes</Text>
          {/* Aquí funciones de los reportes pendientes */}
          <View style={styles.grayContainer}>
            {/* Contenedor gris para los reportes pendientes */}
          </View>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Aprobados</Text>
          {/* Aquí funciones de los reportes aprobados */}
          <View style={styles.grayContainer}>
            {/* Contenedor gris para los reportes aprobados */}
          </View>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.labelH}>Rechazados</Text>
          {/* Aquí funciones de los reportes rechazados */}
          <View style={styles.grayContainer}>
            {/* Contenedor gris para los reportes rechazados */}
          </View>
        </View>
      </View>
    );
  };

  const RankingScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.headerR}>Top Reporters</Text>
  
        <View style={styles.grayContainerR}>
          {/* Contenedor gris para Top Reporters */}
        </View>
  
        <Text style={styles.labelR}>Tu</Text>
  
        <View style={styles.grayContainerR2}>
          {/* Contenedor gris para tu reporte */}
        </View>
      </View>
    );
  };

  const ProfileScreen = () => {
    return <Text>Esta es la pantalla de Mi Perfil</Text>;
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
      marginTop: 0,
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
      paddingLeft: 3
    },
    labelR: {
      color: 'black',
      alignSelf: 'flex-start',
      marginTop: 20,
      marginBottom: 10,
      fontFamily: "InterBold",
      fontSize: 20,
      paddingLeft: 40
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
      width: 350,
      height: 90, 
      paddingLeft: 45
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
      width: 365,
      height: 110 
    },

    grayContainerR: {
      backgroundColor: '#dbd6d6',
      borderRadius: 10,
      marginTop: 20,
      width: 365,
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
