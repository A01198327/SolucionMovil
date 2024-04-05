import React, { useState } from 'react';
import { ScrollView, View, TextInput, Button, StyleSheet, Text, ImageBackground } from 'react-native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    
    console.log('Iniciando sesión');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground source={require('assets/imgb.png')} style={styles.container}>
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
        <Button title="Iniciar sesión" onPress={handleLogin} />
        <Text style={styles.link}>Olvidé mi contraseña</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Esto centra los campos de entrada
    padding: 16,
    width: '104%',
    height: '108%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom:15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 20,
    width: '60%', // Esto hace que los campos de entrada sean más cortos
  },
  link: {
    color: 'blue',
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'gray',
    padding: 14,
    color: '#fff',
  },
});

export default LoginScreen;
