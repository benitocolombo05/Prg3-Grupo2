import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import {auth} from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }
  componentDidMount() {
    if(auth.currentUser){
      this.props.navigation.navigate('HomeMenu');
    }
  }

  onSubmit() {
    this.login(this.state.email, this.state.password);
    console.log('Datos del login:', {
      email: this.state.email,
      password: this.state.password
    });
    
  }

  login(email, pass) {
  auth.signInWithEmailAndPassword(email, pass)
    .then((response) => {
      this.setState({ loggedIn: true });
      this.props.navigation.navigate('Home');
    })
    .catch(error => {
      this.setState({ error: 'Credenciales inválidas.' });
    });
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ingresar</Text>

        <View style={styles.formSection}>
          
          <TextInput 
            style={styles.field} 
            keyboardType='email-address'
            placeholder='email'
            onChangeText={text => this.setState({email: text})}
            value={this.state.email} 
          />
          
          <TextInput 
            style={styles.field} 
            keyboardType='default'
            placeholder='password'
            secureTextEntry={true} 
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
          /> 

          <Pressable onPress={() => this.onSubmit()} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text> 
          </Pressable>

          <Pressable onPress={() => this.props.navigation.navigate('Register')} style={styles.linkContainer}>
            <Text style={styles.linkText}>No tengo cuenta</Text>
          </Pressable>
            {this.state.error !== '' && (
          <Text >error en el login. Checkea tus credenciales zapallo</Text>
        )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    paddingHorizontal: 10,
    paddingTop: 20,
    width: "100vw",
    justifyContent: 'center',
    alignItems: 'center',
},
textoBoton: {
    marginTop: 10,
    justifyContent: 'center',
    justifySelf: 'center',
},
title: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 16,
    color: '#0b1620',
  },
  paragraph: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonBlue: {
    backgroundColor: '#55B7E6',
  },
  buttonOrange: {
    backgroundColor: '#FFA500',
  },
  buttonTextDark: {
    fontSize: 18,
    color: '#0b1620',
    fontWeight: '600',
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: "2px solid rgba(153, 177, 255, 1)",
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    width: '50vw',
    height: '30vh',
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0b1620',
  },
  field: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#55B7E6',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  dataDisplay: {
    backgroundColor: '#e8f4fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0b1620',
  },
  navButton: {
    backgroundColor: '#55B7E6',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  navButtonOrange: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 18,
    color: '#0b1620',
    fontWeight: '600',
  },
  linkContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    marginTop: 10,
    color: '#4a4a4aff',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Login;