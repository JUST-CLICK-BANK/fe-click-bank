import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Container } from '../../css/sujin/Container';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SERVER_URI = "https://just-click.shop/api/v1/auth";

export default function GetLoginToken({ route, navigation }: any) {
    const { url } = route.params;

    const getToken = async (identity:string, type:string, image:string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/login/token?identity=${identity}&type=${type}&image=${image}`);
            AsyncStorage.setItem("login", response.data);
            navigation.reset({
                index: 0,
                routes: [{name: 'SimpleLogin', params: {token: response.data}}]
            });
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if (response) alert("STATUS: " + response.status + "\nDATA: " + response.data);
        }
    }
    const getData = async () => {
        try {
            const response = await axios.get(url+"&isFront=true");
            if (response.data.isAlready) {
                getToken(response.data.identity, response.data.type, response.data.image ?? "");
            } else {
                navigation.reset({
                    index: 1,
                    routes: [
                        {name: 'Login'},
                        {name: 'UserTermOfUse', params: {
                            identity: response.data.identity, 
                            type: response.data.type,
                            nickname: response.data.nickname ?? "",
                            image: response.data.image ?? ""
                        }}
                    ]
                });
            }
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if (response) alert("STATUS: " + response.status + "\nDATA: " + response.data);
        }
    }
    
    useEffect(() => {
        getData();
    },[]);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text>잠시만 기다려주세요...</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
});