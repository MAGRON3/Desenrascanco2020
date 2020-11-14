/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,
{ Component,
  useState,
  useEffect
}  from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const App: () => React$Node = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

   state = {
          UserEmail: '',
          UserPassword: ''
   }

  if (!user) {
    return (
        <LoginActivity />
    );
  }

  database()
    .ref('/users/123')
    .on('value', snapshot => {
      console.log('User data: ', snapshot.val());
    });


  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <View>
        <Button
          title="Exit"
          onPress={() => ExitAccount()}
        />
      </View>
      <View>
        <Button
          title="Push"
          onPress={() => WriteDataBase()}
        />
      </View>
    </View>
  );
};

    function authorization(email,password)
    {
    if (!email)return;
    if (!password)return;

    auth()
      .signInWithEmailAndPassword(email,password)
      .then(() => {
        Alert.alert('User account Signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    }


    function CreateNewAccount(email,password)
    {
    if (!email)return;
    if (!password)return;

    auth()
    .createUserWithEmailAndPassword(email,password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
    }

    function ExitAccount()
    {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    }

    function WriteDataBase()
    {
        database()
          .ref('/users/1234')
          .set({
            name: 'Ada Lovelace',
            age: 31,
          })
          .then(() => console.log('Data set.'));
    }

class LoginActivity extends Component {
   state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   login = (email, pass) => {
      authorization(email,pass)
   }
   createAcc = (email, pass) => {
      CreateNewAccount(email,pass)
   }
   render() {
      return (
         <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Submit </Text>

            </TouchableOpacity>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.createAcc(this.state.email, this.state.password)
               }>
               <Text style = {styles.submitButtonText}> Register </Text>
            </TouchableOpacity>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   }
})

export default App;
