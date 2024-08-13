import { StyleSheet, View, Text, SafeAreaView, TextInput } from 'react-native';
import { Container } from '../../css/sujin/Container';
import NextButton from '../../component/auth/NextButton';
import * as Clipboard from 'expo-clipboard';


export default function ClickHome({ route, navigation }: any) {
    const { token } = route.params;

    const copyTokenToClipboard = async () => {
        await Clipboard.setStringAsync(token);
      };

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <Text>Click home</Text>
                <View style={styles.tokenContatiner}>
                    <Text>유저 토큰</Text>
                    <TextInput 
                        style={{height:30}}
                        defaultValue={token}
                    />
                </View>
                <NextButton text="토큰 복사하기" press={copyTokenToClipboard} active={true} />
                <NextButton text="로그아웃"
                    press={() => navigation.reset({
                        index: 0,
                        routes: [{name: 'KakaoLogout'}]
                    })}
                    active={true}
                />
                 <NextButton text="클릭" press={() => navigation.navigate('Bottom',{token:token})} active={true} />
                {/* <NextButton text="내칭구보기" press={() => navigation.navigate('FriendsComponent', { token: token })} active={true} />
                <NextButton text="내계좌보기" press={() => navigation.navigate('AccountHome',{token:token})} active={true} />
                <NextButton text="내계좌내역보기" press={() => navigation.navigate('AccountHistory')} active={true} />
                <NextButton text="내카드보기" press={() => navigation.navigate('CardList',{token:token})} active={true} />
                <NextButton text="하단바" press={() => navigation.navigate('Bottom',{token:token})} active={true} /> */}


            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tokenContatiner: {
        paddingHorizontal: 20,
        marginTop: 12,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    }
});