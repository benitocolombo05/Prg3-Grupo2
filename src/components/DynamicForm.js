import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: ''
    };
  }

  onSubmit() {
    console.log('Comentario enviado:', {
      comentario: this.state.comentario
    });
  }




  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Comentarios</Text>
        
        <TextInput 
          style={styles.field} 
          keyboardType='default'
          placeholder='Escribe tu comentario aquí...'
          multiline={true}
          numberOfLines={4}
          onChangeText={text => this.setState({comentario: text})}
          value={this.state.comentario} 
        />
        
        <Pressable onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text> 
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f8',
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0b1620',
    textAlign: 'center',
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
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
    marginBottom: 10,
  },
  dataTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0b1620',
  },
});

export default DynamicForm;
