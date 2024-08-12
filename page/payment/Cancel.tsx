import { BackHandler, Text, View } from 'react-native';
import { Container } from '../../css/sujin/Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import CurserLogo from '../../component/pay/CurserLogo';
import * as Linking from 'expo-linking';

export default function Cancel({ navigation, route }: any) {
    const { redirect } = route.params;

    setTimeout(() => {
        Linking.openURL(redirect);
        BackHandler.exitApp();
    }, 3000);

    return (
        <SafeAreaView style={Container.container}>
            <View style={Container.innerContainer}>
                <CurserLogo />
                <Text style={{fontSize:48, fontWeight:500, marginTop:80, marginBottom:40}}>
                    결제 취소
                </Text>
                <Text style={{fontSize:20}}>
                    문제가 발생했거나, 진행을 취소했습니다.
                </Text>
                <Text style={{fontSize:20}}>
                    잠시 후 이전 페이지로 돌아갑니다.
                </Text>
            </View>
        </SafeAreaView>
    );
}