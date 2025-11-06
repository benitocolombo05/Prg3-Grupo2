import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import { db, auth } from '../firebase/config';

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

        {
          this.state.posteos.map(p =>
            <View key={p.id} style={styles.card}>
              <Text style={styles.author}>
                {p.data.author}
              </Text>
              <Text style={styles.text}>
                {p.data.comentario}
              </Text>
              <Text style={styles.time}>
                {new Date(p.data.createdAt).toLocaleString()} {/* chat me dijo de hacerlo asi para que se vea bien */}
              </Text>
            </View>
          )
        }
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