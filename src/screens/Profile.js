import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true,
      email: '',
    };
  }

  componentDidMount() {
    if (auth.currentUser) {
      this.setState({
        email: auth.currentUser.email,
      });
    

    db.collection('posts').where('author', '==', auth.currentUser.email).onSnapshot(
      docs => {
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        this.setState({
          posteos: posts,
          loading: false
        })
      }
    )
  }}

  onSubmit(pId, Likeado) {
      if (Likeado) {
        db.collection('posts').doc(pId).update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
      } else {
        db.collection('posts').doc(pId).update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
      }
    }

  Logout() {
    auth.signOut().then(() => this.props.navigation.navigate('Login'));
  }

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Text>Cargando...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.info}>Email: {this.state.email}</Text>
        <Pressable style={styles.button} onPress={() => this.Logout()}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </Pressable>

        <FlatList
                  data={this.state.posteos}
                  keyExtractor={(p) => p.id}
                  contentContainerStyle={styles.container}
                  renderItem={({ item: p }) => {
                    let Likeado = p.data.likes && p.data.likes.includes(auth.currentUser.email);
                    return (
                      <View style={styles.card}>
                        <Text style={styles.author}>{p.data.author}</Text>
                        <Text style={styles.text}>{p.data.comentario}</Text>
                        <Text style={styles.time}>{new Date(p.data.createdAt).toLocaleString()}</Text>
        
                        <Pressable onPress={() => this.onSubmit(p.id, Likeado)}>
                          <Text>
                            {Likeado ? `No me gusta, ${p.data.likes ? p.data.likes.length : 0}`
                              : `Me gusta, ${p.data.likes ? p.data.likes.length : 0}`}
                          </Text>
                        </Pressable>

                        <Pressable onPress={() => this.props.navigation.navigate('AddComment', { postId: p.id })}>
                          <Text>Comentar</Text>
                        </Pressable>
                      </View>
                    );
                  }}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
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
  }
});

export default Profile;