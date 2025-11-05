import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import {auth} from '../firebase/config';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      registred: false,
      error: '',
    };
  }
  componentDidMount(){
    if(auth.currentUser){
      this.props.navigation.navigate('HomeMenu');
    }
  }

  onSubmit() {
    if (!this.state.email.includes('@') || this.state.password.length < 6) {
      console.log('Datos mal para el registro.');
      this.setState({error: 'Datos inválidos para el registro.'});
      return;
    }
    this.register(this.state.email, this.state.password);
  }

  register(email, password){
    auth.createUserWithEmailAndPassword(email, password)
    .then( response => {
        this.setState({registred: true});
        this.props.navigation.navigate('Login');
        console.log('usuario registrado:', {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        });
    })
    .catch( error => {this.setState({error: "fallo en el registro"})} );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
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
          placeholder='username'
          onChangeText={text => this.setState({username: text})}
          value={this.state.username} 
        />
        <TextInput 
          style={styles.field} 
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true} 
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
        /> 
        <Pressable onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Registrate</Text> 
        </Pressable>
        <Pressable onPress={() => this.props.navigation.navigate('Login')} style={[styles.linkContainer]}>
          <Text style={styles.linkText}>Ya tengo Cuenta</Text>
        </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f8',
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 24,
    color: '#0b1620',
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: "2px solid rgba(226, 153, 255, 1)",
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fde8fcff',
    borderRadius: 8,
    width: '50vw',
    height: '45vh',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#55B7E6',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#0b1620',
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

export default Register;