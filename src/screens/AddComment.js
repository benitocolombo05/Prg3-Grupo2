import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import { FlatList } from 'react-native-web';
import Header from "../components/Header";

class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentarios: [],
      posteo: null,
      postId: this.props.route.params.postId
    };
  }
  componentDidMount() {
    db.collection('posts').doc(this.state.postId).onSnapshot(doc => {
      if (doc.exists) {
        console.log(doc.data());
        this.setState({ posteo: doc.data() });
      }
    })
  }

  onSubmit() {

    db.collection('posts').doc(this.state.postId).update({
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
    if (this.state.posteo) {
      console.log(this.state.posteo);
      return (
        <View style={styles.container}>
          <Header />
          <View style={[styles.card, {border: '2px solid gray'}]}>
            <Text style={styles.author}>{this.state.posteo.author}</Text>
            <Text style={styles.text}>{this.state.posteo.comentario}</Text>
            <Text style={styles.time}>{new Date(this.state.posteo.createdAt).toLocaleString()}</Text>
          </View>
          <Text>Comentarios:</Text>
          <FlatList
            data={this.state.posteo.comentarios}
            keyExtractor={(c) => c.id}
            contentContainerStyle={styles.container}
            renderItem={({ item: c }) => {
              return (
                <View style={[styles.card, {margin: 5}]}>
                  <Text style={styles.author}>{c.author}</Text>
                  <Text style={styles.text}>{c.comentario}</Text>
                  <Text style={styles.time}>{new Date(c.createdAt).toLocaleString()}</Text>
                </View>
              )
            }}
          />

          <TextInput
            style={styles.field}
            placeholder="Escribe un comentario..."
            multiline={true}
            numberOfLines={2}
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flex: 1,
    width: '100%',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
  author: {
    fontWeight: 'bold',
    marginBottom: 6
  },
  text: {
    fontSize: 16,
    marginBottom: 6
  },
  time: {
    fontSize: 12,
    color: '#666'
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

export default AddComment;