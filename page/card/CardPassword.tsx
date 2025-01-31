import { Alert, TouchableOpacity, Text, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Keypad from '../../component/auth/Keypad';
import { useState } from 'react';
import { saveCard } from '../../component/api/CardApi'; // saveCard 함수 import
import { AxiosResponse } from 'axios';

type CardCheck = 'CREDIT' | 'CHECK';
type CardTransportation = 'POSTPAID' | 'PREPAYMENT';

type data = {
    cardPassword: string;
    cardCheck: CardCheck;
    account: string;
    cardTransportation: CardTransportation;
    id: number;
    cardPaymentDate: number;
}

const {width, height} = Dimensions.get('window');

export default function CardPassword({ route, navigation }: any) {
    const [password, setPassword] = useState("");
    const [toStar, setStar] = useState("");
    const [infoText, setInfoText] = useState("");
    const { cardPaymentDate, account, cardCheck, cardTransportation, id }: data = route.params;
    const { token } = route.params;

    const handleNextPress = async () => {
        if (password.length === 4) {
            const cardData = {
                cardPaymentDate: "15",
                cardPassword: password,
                account,
                cardCheck,
                cardTransportation,
                cardProductId: id,
            };
            console.log('cardData:', cardData);

            try {
                const res: AxiosResponse<any> = await saveCard(token, cardData);
                // Alert.alert("카드 정보가 성공적으로 저장되었습니다.");
                navigation.navigate("CardComplete", {
                    token
                });
            } catch (error) {
                console.error("카드 정보를 저장하는 데 실패했습니다:", error);
                Alert.alert("카드 정보를 저장하는 데 실패했습니다. 나중에 다시 시도해주세요.");
            }
        } else {
            Alert.alert("경고", "비밀번호 4자리를 입력해 주세요.");
        }
    }

    const addPassword = (str: string) => {
        if (password.length >= 4) return;
        setPassword(password + str);
        setStar("●".repeat(password.length + 1));
    }

    const splitePassword = password.split('');

    const removePassword = () => {
        if (password.length == 0) return;
        setInfoText("");
        setPassword(password.slice(0, password.length - 1));
        setStar("●".repeat(password.length - 1));
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>카드 비밀번호</Text>
                <View style={styles.passwordBox}>
                    <View style={styles.circleWrap}>
                        <Text style={splitePassword[0] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[1] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[2] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                        <Text style={splitePassword[3] !== undefined ? styles.circleOn : styles.circleOff}>●</Text>
                    </View>
                </View>
                <Keypad numberKeyEvent={addPassword} backKeyEvent={removePassword}/>
                <TouchableOpacity style={styles.applyButton} onPress={handleNextPress}>
                    <Text style={styles.applyButtonText}>다음</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        flexGrow: 1,
        width: "100%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
    },
    passwordBox: {
        flex: 1,
        width: "100%",
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
        width: 160,
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
    applyButton: {
        backgroundColor: '#007378',
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: width - 40,
        marginHorizontal: 20,
        marginTop: 20
    },
    applyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
});
