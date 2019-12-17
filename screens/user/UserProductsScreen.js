import React from 'react';
import { Alert, FlatList, Platform, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = (props) => {
  const userProducts = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()
  
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you want to delete this item?', [
      {text: 'No', style: 'default'},
      {text: 'Yes', style: 'destructive', onPress: () => {
        dispatch(productsActions.deleteProduct(id))
      }}
    ])
  }

  return ( 
    <FlatList 
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem 
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button 
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              props.navigation.navigate('EditProducts',{
                productId: itemData.item.id
              })
            }} />
          <Button 
            color={Colors.primary}
            title='Delete'
            onPress={() => {
              deleteHandler(itemData.item.id)
            }}  />
        </ProductItem>
      )}
       />
   );
}

UserProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Products',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={()=>{
            navData.navigation.toggleDrawer()
          }} />
      </HeaderButtons>),
      headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
            title='Add'
            iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
            onPress={()=>{
              navData.navigation.navigate('EditProducts')
            }} />
        </HeaderButtons>)
  }
}
 
export default UserProductsScreen;