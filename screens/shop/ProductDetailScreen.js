import React from 'react'
import { ScrollView, View, Button, Text, Image, StyleSheet  } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

function ProductDetailScreen(props) {
  const productId = props.navigation.getParam('productId')
  const selectedProduct = useSelector(state => 
    state.products.availableProducts.find(prod => prod.id === productId)  
  )
  const dispatch = useDispatch()
  
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to cart" onPress={()=>{
          dispatch(cartActions.addToCart(selectedProduct))
        }} />
      </View>
      <Text style={StyleSheet.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

ProductDetailScreen.navigationOptions = navData => ({
  headerTitle: navData.navigation.getParam('productTitle')
})

export default ProductDetailScreen
