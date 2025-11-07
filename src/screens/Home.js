import { React, Component } from "react";
import { View, Text, Pressable, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-web";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true
    };
  }

  componentDidMount() {
    if (!auth.currentUser) {
      this.props.navigation.navigate('Login');
    }
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
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
  }
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


  render() {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" position="absolute-center"/>
        </View>
      );
    }
    if (auth.currentUser) {
    return (

      <View style={styles.container}>
        
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

                <Pressable onPress={() => this.onSubmit(p.id, Likeado)} style={styles.button}>
                <Text>
                            {Likeado ? `No me gusta, ${p.data.likes ? p.data.likes.length : 0}`
                              : `Me gusta, ${p.data.likes ? p.data.likes.length : 0}`}
                          </Text>
                </Pressable>

                <Pressable onPress={() => this.props.navigation.navigate('AddComment', { postId: p.id })}style={styles.button}>
                  <Text style={styles.buttonText}>Comentar</Text>
                </Pressable>
              </View>
            );
          }}
        />
      </View>
    );}
  }
  
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
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

export default Home;