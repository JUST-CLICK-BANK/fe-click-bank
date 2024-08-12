import { useEffect,useState } from 'react';
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View,TouchableOpacity,Text } from 'react-native';

// type TransferNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AccountType'>
// type Props = {
//     navigation: TransferNavigationProp;
//   };

type data = {
    token: string;
    userName: string;
}

export default function AccountType( {  navigation, route }: any ) {
    const { token, userName }: data = route.params;

    useEffect(() => {
        console.log('userName:', userName);
    }, [userName]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.buttonAccount} onPress={() => navigation.navigate('CreateAccount',{ accountType: '입출금 통장', token, userName })} >
        <Text style={styles.buttonText}>입출금 통장</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount', { accountType: '모임 통장', token, userName })}>
        <Text style={styles.buttonText}>모임 통장</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavingAccountList',{ accountType: '적금', token,userName })} >
        <Text style={styles.buttonText}>적금</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccount', { accountType: '예금', token,userName })} >
        <Text style={styles.buttonText}>예금
        </Text>
    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAccount:{
        height:80,
        width:350,
        paddingHorizontal: 20,
        // paddingVertical: 30,
        alignContent:'center',
        justifyContent:'center',
        backgroundColor: '#B7E1CE',
        borderRadius: 5,
        marginBottom: 18,
        marginTop:60,
    },
    
    button: {
        paddingHorizontal: 20,
        // paddingVertical: 30,
        alignContent:'center',
        justifyContent:'center',
        height:80,
        width:350,
        backgroundColor: '#B7E1CE',
        borderRadius: 5,
        position:"static",
        marginBottom: 18,
        // marginTop:80,
        // margin:15,
        },
        buttonText: {
        textAlign:'left',
        fontSize: 20,
        color: 'black',
        }
});