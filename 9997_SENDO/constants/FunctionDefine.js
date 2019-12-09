import React, { Component } from 'react';
import {Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConvertCurrency = (x)=> {
    if (Platform.OS === 'android') { // only android needs polyfill
        require('intl'); // import intl object
        require('intl/locale-data/jsonp/it-IT'); // load the required locale details
      }
      return Number.parseInt(x).toLocaleString('it-IT');
}

const renderStars = (star, size ,color='rgb(242, 201, 76)') => {
  const fields = [];
  if(star===0) return null;
  for (let i = 0; i < 5; i++) {
    if (i < Number.parseInt(star)) {
      fields.push(
        <Ionicons key={i} name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'} color={color} size={size} />
      );
    }
    else {
      fields.push(
        <Ionicons key={i} name={Platform.OS == 'ios' ? 'ios-star' : 'md-star'} color='white' size={size} />
      );
    }
  }
  return fields;
};

const checkImageError = (x) => {
  if (x.includes(".jpg") || x.includes(".jpeg") || x.includes(".png") || x.includes(".ico"))
    return true;
  else return false;
};

export {ConvertCurrency, renderStars, checkImageError}