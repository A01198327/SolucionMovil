import React, { useState } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, Button } from 'react-native';
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
        <Text style={styles.header}>Genera tu reporte</Text>
        
        <Text style={styles.label}>Título (Descripción breve)</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Tienda</Text>
        <TextInput style={styles.input} value={store} onChangeText={setStore} />

        <Text style={styles.label}>Sucursal</Text>
        <TextInput style={styles.input} value={branch} onChangeText={setBranch} />

        <Text style={styles.label}>Describe la anomalía</Text>
        <TextInput style={styles.input2} value={description} onChangeText={setDescription} multiline />

        <Text style={styles.label}>Agrega una imagen que apoye tu reporte</Text>
        {/* Aquí  agregar un componente para subir imágenes */}

        <TouchableOpacity style={styles.button} onPress={handleGenerateReport}>
          <Text style={styles.buttonText}>Generar mi reporte</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const HistoryScreen = () => {
    return <Text>Esta es la pantalla de Historial de Reportes</Text>;
  };

  const RankingScreen = () => {
    return <Text>Esta es la pantalla de Ranking</Text>;
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
          <Text>Contacto</Text>
          <Text>mkt@ejemplo.ejemplo.com</Text>
          <Text>+50 1 234 5678</Text>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    header: {
      width: '100%',
      padding: 20,
      fontSize: 24,
      fontFamily: "NunitoSansBold",
      marginBottom: 70,
      alignSelf: 'flex-start'
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
    input2: {
      height: 15,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      borderRadius: 20,
      width: '80%',
      fontFamily: "InterBold",
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
      padding: 14,
      color: '#fff',
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
