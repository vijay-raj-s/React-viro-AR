'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      northPointX: 0,
      northPointZ: 0,
      southPointX: 0,
      southPointZ: 0,
      eastPointX: 0,
      eastPointZ: 0,
      westPointX: 0,
      westPointZ: 0,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  render() {

    console.log(this.state.northPointX);
    console.log(this.state.northPointZ);
    console.log(this.state.southPointX);
    console.log(this.state.southPointZ);

    return (
      <ViroARScene onTrackingInitialized={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.2,2,.2]} position={[0, -2, -5]} style={styles.helloWorldTextStyle} />
        <ViroText text="North Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[this.state.northPointX, 0, this.state.northPointZ]} style={styles.helloWorldTextStyle} />
        <ViroText text="South Text" scale={[3, 3, 3]} transformBehaviors={["billboard"]} position={[this.state.southPointX, 0, this.state.southPointZ]} style={styles.helloWorldTextStyle} />
       </ViroARScene>
    );
  }

  _onInitialized() {
    var northPoint = this._transformPointToAR(49.50779787193362, 8.479225686742009); 
    var southPoint = this._transformPointToAR(49.507849793521714, 8.478954229085792); 
    this.setState({
      northPointX: northPoint.x,
      northPointZ: northPoint.z,
      southPointX: southPoint.x,
      southPointZ: southPoint.z,
      text : "AR Init called."
    });
  }

 _latLongToMerc(lat_deg, lon_deg) {
   var lon_rad = (lon_deg / 180.0 * Math.PI)
   var lat_rad = (lat_deg / 180.0 * Math.PI)
   var sm_a = 6378137.0
   var xmeters  = sm_a * lon_rad
   var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
   return ({x:xmeters, y:ymeters});
}

_transformPointToAR(lat, long) {
  var objPoint = this._latLongToMerc(lat, long);
  var devicePoint = this._latLongToMerc(49.50779787193362, 8.479225686742009);
  console.log("objPointZ: " + objPoint.y + ", objPointX: " + objPoint.x)
  // latitude(north,south) maps to the z axis in AR
  // longitude(east, west) maps to the x axis in AR
  var objFinalPosZ = objPoint.y - devicePoint.y;
  var objFinalPosX = objPoint.x - devicePoint.x;
  //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
  return ({x:objFinalPosX, z:-objFinalPosZ});
}

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
