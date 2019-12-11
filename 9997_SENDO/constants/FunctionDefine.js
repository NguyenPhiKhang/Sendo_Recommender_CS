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

const filterForUniqueProducts = async (arr) => {
  const cleaned = [];
  arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
          const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
          if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
  });
  return cleaned;
};

function change_alias(alias) {
  var str = alias;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  str = str.replace(/ + /g," ");
  str = str.replace(/ /g, "-");
  str = str.trim(); 
  return str;
}

export {ConvertCurrency, renderStars, checkImageError, filterForUniqueProducts, change_alias}