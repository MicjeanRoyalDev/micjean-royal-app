import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Options from './parts/OptionCard.js'
import ProfileHeader from './parts/ProfileHeader.js'
import LogoutBtn from './parts/LogoutBtn.js'
//the function 
export default function ProfileScreen(){
    //the return function
    return(
        /*I used rneui, so I have to wrap it in SafeAreaView instead of View*/
        <SafeAreaView style={{flex:1, padding: 10, flexDirection: 'column'}}>
            {/*The profile header*/}
            <ProfileHeader />
            {/*The various cards displayed*/}
            <Options/>
            {/*The logout button*/}
            <LogoutBtn></LogoutBtn>
            {/*The bottom navbar*/}
        </SafeAreaView>
    )
}