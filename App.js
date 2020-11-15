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
  useEffect,
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
  FlatList,
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

var UserName = 'empty';
var UserHearts = 0;

var DATA = [
  {
    name: 'den5553_yandex_ru',
    hearts: 6,
  },
  {
    name: 'Second Item',
     hearts: 0,
  },
  {
    name: 'Third Item',
     hearts: 0,
  },
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styleslist.item, style]}>
    <Text style={styleslist.title}>{item.name}</Text>
  </TouchableOpacity>
);



const App: () => React$Node = () => {

  const renderItem = ({ item }) => {
    const backgroundColor = item.name === selectedId ? "#6e3b6e" : (item.hearts >>> 0 ? "#DC143C" : "#98FB98") ;


    function StillHeart(username)
    {
        var Hearts = 0;
        database()
          .ref('/users/' + username)
          .once('value')
          .then(snapshot => {
            console.log('UserHearts.',snapshot.val().hearts)
            Hearts = snapshot.val().hearts;
            if (Hearts > 0)
            {
               Hearts--;
               database()
                 .ref('/users/' + username)
                 .update({
                   hearts: Hearts,
                 })
                 .then(() => {
                    console.log('Data updated.');
                 })
            }
          });
        setSelectedId(item.name);
    }

    return (
      <Item
        item={item}
        onPress={() => StillHeart(item.name)}
        style={{ backgroundColor }}
      />
    );
  };

  // Set an initializing state whilst Firebase connects
  const [selectedId, setSelectedId] = useState(null);
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

   console.log('render');

  return (

    <View style = {stylesMain.container}>
      <Text style = {stylesMain.text}>Welcome {user.email}</Text>
      <Text style = {stylesMain.text}>You have {0} hearts</Text>
      <View>
        <TouchableOpacity
           style = {stylesMain.submitButton}
           onPress={() => ExitAccount()}>
           <Text style = {stylesMain.submitButtonText}> Exit </Text>
        </TouchableOpacity>
      </View>
      <View style = {stylesMain.containerlist}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          extraData={selectedId}
        />
        </View>
    </View>
  );
};

    function parserMyData(data)
    {
        UserHearts = data.hearts;
    }

    function parserUser(usersname)
    {

    }

    function subscribe()
    {
        database()
          .ref('/users/' + UserName)
          .on('value', snapshot => {
            console.log('User data: ', snapshot.val());
            parserMyData(snapshot.val());
          });

        database()
          .ref('/users/')
          .on('value', snapshot => {
            console.log('User: ', snapshot.val());
            parserUser (snapshot.val());
          });
    }

    function authorization(email,password)
    {
        if (!email)return;
        if (!password)return;


        auth()
          .signInWithEmailAndPassword(email,password)
          .then(() => {
            email = email.replace('@','_');
            email = email.replace('.','_');
            UserName = email;
            subscribe();
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

        email = email.replace('@','_');
        email = email.replace('.','_');
        UserName = email;
        database()
          .ref('/users/'+ UserName)
          .set({
            name: UserName,
            hearts: 10,
          })
          .then(() => console.log('Data set.'));
          console.log('User account created & signed in!');
         subscribe();
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
          .then(() =>
          {
            database()
            .ref('/users/' + UserName)
            .off('value');
            database()
            .ref('/users/')
            .off('value');
            console.log('User signed out!');
          });
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
         <View style = {stylesLogin.container}>
            <TextInput style = {stylesLogin.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>

            <TextInput style = {stylesLogin.input}
               underlineColorAndroid = "transparent"
               placeholder = "Password"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

            <TouchableOpacity
               style = {stylesLogin.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }>
               <Text style = {stylesLogin.submitButtonText}> Submit </Text>

            </TouchableOpacity>
            <TouchableOpacity
               style = {stylesLogin.submitButton}
               onPress = {
                  () => this.createAcc(this.state.email, this.state.password)
               }>
               <Text style = {stylesLogin.submitButtonText}> Register </Text>
            </TouchableOpacity>
         </View>
      )
   }
}

const stylesLogin = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   html : {
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
});

const stylesMain = StyleSheet.create({
   container: {
      paddingTop: 23,
   },
  containerlist: {
        paddingTop: 23,
        marginVertical: 10,
     },
   text: {
      margin: 15,
      height: 20,
      marginVertical: 0,
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      marginVertical: 5,
   },
   submitButtonText:{
      color: 'white'
   }
});

const styleslist = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    margin: 15,
    height: 50,
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default App;
