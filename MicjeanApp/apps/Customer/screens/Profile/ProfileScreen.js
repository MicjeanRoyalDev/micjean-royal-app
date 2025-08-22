import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Options from './parts/OptionCard.js'
import ProfileHeader from './parts/ProfileHeader.js'
//the function 
export default function ProfileScreen(){
    //the return function
    return(
        <SafeAreaView style={{flex:1, padding: 10, flexDirection: 'column'}}>
            {/*The profile header*/}
            <ProfileHeader />
            {/*The various cards displayed*/}
            <Options/>
            {/*The bottom navbar*/}
        </SafeAreaView>
    )
}