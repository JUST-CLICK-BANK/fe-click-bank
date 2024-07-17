import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View ,Image,Text,TouchableOpacity} from 'react-native';

export default function AccountComplete( {  navigation }: any ) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                {/* 여기에 페이지 내용 작성 */}
                <Image
            source={require('../../assets/image/Click_logo.png')}
            style={styles.imageStyle} resizeMode="contain"/>
            <Text style = {styles.textcontainer}>축! 개설완료!</Text>  
            <TouchableOpacity style={styles.button} onPress={() => alert('메인으로 이동합니다')}>
                <Text style={styles.buttonText}>메인으로</Text>
            </TouchableOpacity>
            {/* <StatusBar style="auto"/> */}
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
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle:{
        // width:"100%",
        // height:"100%",
        // justifyContent:'center',
        alignSelf: 'auto',
        alignItems:'center',
        width: 300, // 로고 이미지의 너비
        height: 300, // 로 이미지의 높이
        // marginBottom:100 ,

        
    },

    textcontainer:{
    // height: 100,
    // width: 500,
    textAlign:'center',
    fontSize: 25,
    marginBottom:100,
    },
    button: {
    // paddingHorizontal: 100,
    // paddingVertical: 20,
    // backgroundColor: '#B7E1CE',
    // borderRadius: 5,
    // position:"static"
    marginTop: 16,
    marginBottom: 30,
    backgroundColor: '#B7E1CE',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    maxWidth: 325,
    alignSelf: 'center',
    },
    buttonText: {
    fontSize: 20,
    color: 'black',
    },
});