import {BackHandler, Image, SafeAreaView, StyleSheet, Text, Vibration, View} from 'react-native';
import { Container } from '../../css/sujin/Container';
import { useCallback, useEffect, useState } from 'react';
import Keypad from '../../component/auth/Keypad';
import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentData } from '../../types/PayTypes';

const SERVER_URI = "https://just-click.shop/api/v1/auth";

export default function LoginCheck({ navigation, route }: any) {
    const { payData } = route.params;
    const [token, setToken] = useState<string>();
    const [password, setPassword] = useState("");
    const [toStar, setStar] = useState("");
    const [infoText, setInfoText] = useState("");

    const cancelPayment = useCallback(() => {
        BackHandler.removeEventListener('hardwareBackPress', cancelPayment);
        navigation.reset({
            index: 0,
            routes: [{name: 'PaymentCancel', params: {redirect: payData?.failRedirUrl, payId: payData?.payId}}]
        });
        return true;
    },[]);
    BackHandler.addEventListener('hardwareBackPress', cancelPayment);

    const getUserToken = async (str: string) => {
        try {
            const response = await axios.get(`${SERVER_URI}/token?token=${token}&password=${str}`);
            return response.data;
        } catch (error) {
            const {response} = error as unknown as AxiosError;
            if(response){
                console.log(response.data);
                return {status: response.status, data: response.data};
            }
            console.log(error);
            return error;
        }
    }

    const addPassword = async (str: string) => {
        if (password.length >= 6) return;
        Vibration.vibrate(30);
        setPassword(password + str);
        setStar("●".repeat(password.length+1));
        if (password.length == 5) {
            const data = await getUserToken(password + str);
            if (data.status == 400) {
                setInfoText("로그인에 실패했어요...");
                Vibration.vibrate(200);
            } else if (data.status == 403) {
                AsyncStorage.removeItem("login");
                alert("자동 로그인 정보가 만료되었습니다.\n로그인 후 다시 시도해주세요.");
                BackHandler.exitApp();
            } else {
                Vibration.vibrate(60);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Payment', params: {payData: payData, userToken: data, card: null}}]
                });
            }
        }
    }

    const splitePassword = password.split('');

    const removePassword = () => {
        if (password.length == 0) return;
        setInfoText("");
        setPassword(password.slice(0, password.length-1));
        setStar("●".repeat(password.length-1));
    }

    const getLoginToken = async () => {
        const getToken = await AsyncStorage.getItem("login")
        if (getToken == null) {
            alert("로그인 후 이용해 주세요.");
            // 결제 취소??
            BackHandler.exitApp();
        } else {
            setToken(getToken);
        }
    }

    useEffect(() => {
        getLoginToken();
    },[])

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text style={styles.titleText}>간편 로그인</Text>
                <View style={styles.passwordBox}>
                    <View style={styles.circleWrap}>
                        <Text style={splitePassword[0] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[1] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[2] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[3] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[4] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[5] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                    </View>
                    <View style={infoText !== "" ? styles.infoTextView : { position: "absolute", bottom: 100 }}>
                        <Text
                            style={styles.infoText}
                        >{infoText}</Text>
                    </View>
                </View>
                <Keypad numberKeyEvent={addPassword} backKeyEvent={removePassword}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 50,
        width: 240,
        height: 100
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
    },
    passwordBox: {
        flex: 1,
        width: "65%",
        paddingTop: "5%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    passwordStar: {
        width: '100%',
        letterSpacing: 12,
        paddingBottom: 16,
        paddingTop: 28,
        fontSize: 24,
        fontWeight:'600',
        textAlign: 'center',
        borderBottomWidth: 2,
        borderColor: "#000"
    },
    circleWrap: {
        width: 240,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    circleOn: {
        color: "#333",
        fontSize: 30
    },
    circleOff: {
        color: '#ddd',
        fontSize: 30
    },
    infoTextView: {
        position: 'absolute',
        bottom: 100,
        marginTop: 50,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
    },
    infoText: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        fontWeight: 'bold',
    }
});