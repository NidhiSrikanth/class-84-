import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends Component{
constructor(){
    super();
    this.state= {
        userID: firebase.auth().currentUser.email,
        allNotifications: []
    }
    this.notificationRef= null
}

getNotifications=()=> {
    this.requestRef= db.collection("all_notifications")
    .where("notification_status", "==", "unread")
    .where("targeted_user_Id","==", this.state.userID )
    .onSnapshot((snapshot)=>{
var allNotifications= []
snapshot.docs.map ((doc)=>{
var notification= doc.data()
notification ["doc_Id"] = doc.Id
allNotifications.push(notification)
})
this.setState({
    allNotifications: allNotifications
})
    })
}

componentDidMount(){
this.getNotifications()
}

componentWillUnmount(){
    this.notificationRef= null
}

keyExtractor = (item, index) => index.toString()

 renderItem = ({item,index}) =>
 { return ( <ListItem key={index} 
 leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
 title={item.book_name}
 titleStyle={{ color: 'black', fontWeight: 'bold' }} 
subtitle={item.message} bottomDivider /> ) }

    render(){
        return(
            <View style= {{flex: 1}}>
              <View style= {{flex: 0.1}}>
                  <MyHeader title= {"notifications"}
                  navigation= {this.props.navigation}></MyHeader>
              </View>
              <View style= {{flex: 0.9}}>
                  {
                      this.state.allNotifications.length=== 0 ? (<View style= {{felx:1, justifyContent: "center", alignItems: "center"}}>
                          <Text style= {{fontSize: 25}}> you have no notifications </Text>
                      </View>): (
                 <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.all_Notifications}
                 renderItem={this.renderItem}
               />
        )
                    
                  }
              </View>
            </View>
        )
    }
}