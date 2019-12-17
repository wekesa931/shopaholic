import React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons'

import EditProductScreen from '../screens/user/EditProductScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import CartScreen from '../screens/shop/CartScreen'
import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductOverviewScreen,
  ProductDetail: ProductDetailScreen,
  Cart: CartScreen
}, {
  navigationOptions: {
    drawerIcon: drawerConfog => <Ionicons
      name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
      size={23}
      color={drawerConfog.tintColor}
     />
  },
  defaultNavigationOptions: defaultNavOptions
})

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen
},{
  navigationOptions: {
    drawerIcon: drawerConfog => <Ionicons
      name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
      size={23}
      color={drawerConfog.tintColor}
     />
  },
  defaultNavigationOptions: defaultNavOptions
})

// -----------------------

const AdminNavigator = createStackNavigator({
  UserProducts: UserProductsScreen,
  EditProducts: EditProductScreen
},{
  navigationOptions: {
    drawerIcon: drawerConfog => <Ionicons
      name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
      size={23}
      color={drawerConfog.tintColor}
     />
  },
  defaultNavigationOptions: defaultNavOptions
})

// -----------------------

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrdersNavigator,
  User: AdminNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
})

export default createAppContainer(ShopNavigator)