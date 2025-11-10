import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Header from "../components/Header";
import AddComment from './AddComment';
import { ActivityIndicator } from 'react-native-web';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            loading: true,
            email: '',
            username: '',
        };
    }

    componentDidMount() {
        if (auth.currentUser) {
            this.setState({
                email: auth.currentUser.email,
            });
            db.collection("users").where("email", "==", auth.currentUser.email).get()
                .then(user => {
                    let usuario = user.docs[0].data();
                    console.log(usuario);
                    this.setState({ username: usuario.username });
                })
                .catch(e => console.log(e));

            db.collection('posts').where('author', '==', auth.currentUser.email).onSnapshot(
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

    Logout() {
        auth.signOut().then(() => this.props.navigation.navigate('Login'));
    }

    render() {

        if (this.state.loading) {
              return (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              );
        }

        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center', flexDirection: 'column' }}> {/* TIRA UN ERROR RARO */}
                    <Image
                        source={require('../../assets/User.png')}
                        style={{ width: 100, height: 100, }}
                    />
                    <Text style={styles.title}>{this.state.username}</Text>
                </View>
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


                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 4 }}>
                                    <Pressable onPress={() => this.onSubmit(p.id, Likeado)} >
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

const styles = StyleSheet.create({
    container: {
        padding: 12
    },
    loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
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

export default Profile;