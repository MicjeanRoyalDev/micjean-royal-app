import React from 'react'
import { View } from 'react-native'
import Options from './parts/OptionCard.js'
import ProfileHeader from './parts/ProfileHeader.js'
//the function 
export default function ProfileScreen(){
    //the return function
    return(
        <View style={{flex:1, padding: 10, flexDirection: 'column'}}>
            {/*The profile header*/}
            <ProfileHeader />
            {/*The various cards displayed*/}
            <Options/>
            {/*The bottom navbar*/}
        </View>
    )
}