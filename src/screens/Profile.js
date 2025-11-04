import React, { Component } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    const currentUser = auth.currentUser;
    if (currentUser) {
      this.setState({ email: currentUser.email });

      db.collection("posts")
        .where("owner", "==", currentUser.email)
        .onSnapshot(
          (docs) => {
            let posts = [];
            docs.forEach((doc) => {
              posts.push({
                id: doc.id,
                description: doc.data().description,
                likes: doc.data().likes,
              });
            });
            this.setState({ posts, loading: false });
          },
          (error) => {
            console.log("ERROR LEYENDO POSTS:", error.message);
            this.setState({ loading: false });
          }
        );
    }
  }

  onLogout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log("ERROR AL DESLOGUEARSE:", error.message);
      });
  }

  renderItem({ item }) {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.postDescription}>{item.description}</Text>
        <Text style={styles.postLikes}>Likes: {item.likes.length}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.email}>Email: {this.state.email}</Text>

        <Pressable style={styles.logoutButton} onPress={() => this.onLogout()}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </Pressable>

        <Text style={styles.subtitle}>Mis Posteos</Text>
        {this.state.loading ? (
          <Text>Cargando posteos...</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={(item) => this.renderItem(item)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f6f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  postContainer: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 12,
  },
  postDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  postLikes: {
    fontSize: 14,
    color: "#555",
  },
});

export default Profile;
