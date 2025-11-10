import { React, Component } from "react";
import { View, Text, Pressable, FlatList, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-web";
import Header from "../components/Header";

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
          <ActivityIndicator size="large" color="#0000ff" position="absolute-center" />
        </View>
      );
    }
    if (auth.currentUser) {
      return (
        <View style={styles.container}>
          <Header />

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


                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 4 }}>
                    <Pressable onPress={() => this.onSubmit(p.id, Likeado)} style={styles.button}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {Likeado ? (
                          <Image
                            source={require('../../assets/Like.png')}
                            style={{ width: 20, height: 20, marginRight: 2 }}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/NoLike.png')}
                            style={{ width: 20, height: 20, marginRight: 2 }}
                          />
                        )}
                        <Text>{p.data.likes ? p.data.likes.length : null}</Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => this.props.navigation.navigate('HomeStack', {
                      screen: 'AddComment',
                      params: { postId: p.id }
                    })} style={styles.button}>
                      <Image
                        source={require('../../assets/Comment.png')}
                        style={{ width: 20, height: 20, marginLeft: 6 }}
                      />
                    </Pressable>
                  </View>
                  <Text style={styles.time}>{new Date(p.data.createdAt).toLocaleString()}</Text>
                </View>
              );
            }}
          />
        </View>
      );
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
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

export default Home;