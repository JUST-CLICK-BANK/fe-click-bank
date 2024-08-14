import React, {useEffect, useState} from 'react';
import { TouchableOpacity, Image, TextInput, Text, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import {getCardProduct} from "../../component/api/CardListApi";

interface CardProductResponse {
    cardProductId: number;
    cardProductName: string;
    cardBenefits: string;
    cardAnnualFee: number;
    cardImg: string;
}

export default function CardInformation({ route, navigation }:any) {
    const id:number = route.params?.id;
    const [cardProduct, setCardProduct] = useState<CardProductResponse>();
    const token = route.params?.token;
    useEffect(() => {
        getCardProductInfo();
    },[])

    const getCardProductInfo = async ()  => {
        try {
            const res = await getCardProduct(id);
            setCardProduct(res.data.data.getCardProduct);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.cardText}>카드 정보</Text>
                </View>
                <View style={styles.header}>
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage} source={{ uri: cardProduct?.cardImg }} />
                    </View>
                    <View style={styles.cardInformation}>
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardName}>{cardProduct?.cardProductName}</Text>
                            <Text style={styles.cardDescription}>카드 설명</Text>
                        </View>
                        <View style={styles.cardBenefits}>
                            <Text style={styles.cardBenefitsText}>{cardProduct?.cardBenefits}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.feeContainer}>
                    <Text style={styles.feeText}>연회비</Text>
                    <Text style={styles.feeInput}>{cardProduct?.cardAnnualFee.toLocaleString()}원</Text>
                    
                </View>
                <View style={styles.cardDetailDescription}>
                    <View style={styles.cardDetailDescriptionTitle}>
                        <Text>카드 상세 설명</Text>
                    </View>
                    <View>
                        <Text>여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다. 여기는 카드 상세 설명이 들어가는 설명칸입니다.여기는 카드 상세 설명이 들어가는 설명칸입니다. </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('CreateCard',{token,id})}>
                    <Text style={styles.applyButtonText}>신청하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        width: "100%",
        height:"90%",
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
         backgroundColor: 'white',
    },
    nameContainer: {
        width: '85%',
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    cardText: {
        fontSize: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    cardImage: {
        width: 100,
        height: 150,
        // backgroundColor: '#B7E1CE',
        borderRadius: 10,
    },
    cardDetails: {
        alignItems: 'center',
        marginVertical: 10,
        justifyContent:'space-between',
    },
    cardInformation: {
        marginLeft: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    cardName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardDescription: {
        fontSize: 16,
        color: '#666',
    },
    cardBenefits: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        height: 100,
    },
    cardBenefitsText: {
        fontSize: 16,
    },
    feeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        padding: 10,
        width:'85%'
    },
    feeText: {
        fontSize: 16,
    },
    feeInput: {
        fontSize: 16,
        color: '#000',
    },
    cardDetailDescription: {
        borderWidth: 1,
        borderColor: '#B7E1CE',
        borderRadius: 10,
        padding: 10,
        height: 250,
        marginVertical: 10,
        textAlignVertical: 'top',
        width:'85%'
    },
    cardDetailDescriptionTitle: {
        width:'100%',
        height: '15%'
    },
    applyButton: {
    backgroundColor: '#B7E1CE',
    padding: 15,
    marginVertical:10,
    borderRadius: 10,
    alignItems: 'center',
    width:'85%'
    },
    applyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
    },
    cardContainer: {}
});