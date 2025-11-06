import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: '',
      postId: this.props.route.params.postId
    };
  }
  componentDidMount() {
    if (!auth.currentUser) {
      this.props.navigation.navigate('Login');
    };
    

  }

  onSubmit() {

    db.collection('posts').doc(postId).update({
      comentarios: firebase.firestore.FieldValue.arrayUnion({
        author: auth.currentUser.email,
        comentario: this.state.comentario,
        createdAt: Date.now()
      })
    })
      .then(() => {
        this.setState({ comentario: '' });
        console.log('Comentario agregado');
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.field}
          placeholder="Escribe un comentario..."
          multiline={true}
          numberOfLines={4}
          onChangeText={text => this.setState({ comentario: text })}
          value={this.state.comentario}
        />
        <Pressable onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Comentar</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  field: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddComment;