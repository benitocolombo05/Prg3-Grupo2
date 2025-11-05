import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { db } from '../firebase/config';

class Posteos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true
    };
  }

  componentDidMount() {
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
  onSubmit() {


    
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

              <Pressable onPress={() => this.onSubmit()} style={styles.button}>
                <Text style={styles.buttonText}>Me gusta</Text>
              </Pressable>

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

export default Posteos;