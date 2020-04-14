// ejemplo mapView
import React from 'react';
import {Alert,Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import sheet from './src/styles/sheet';
import {onSortOptions} from './src/utils';
import BaseExamplePropTypes from './common/BaseExamplePropTypes';
import TabBarPage from './common/TabBarPage';


MapboxGL.setAccessToken("pk.eyJ1Ijoiam9zZWluZm9ybWF0aWNvMjAxNSIsImEiOiJjazdzNWFmYnIwY21uM3NvNHZoemg5ZmJqIn0.EHg5K9m_gdHJBnL1JcudYg");

// ejemplo customIcon
import exampleIcon from './src/assets/example.png';
import Page from './common/Page';
import Bubble from './common/Bubble';
import {featureCollection, feature} from '@turf/turf';

export default class App extends React.Component {
  static propTypes = {
    ...BaseExamplePropTypes,
  };

  constructor(props) {
    super(props);

    this._mapOptions = Object.keys(MapboxGL.StyleURL)
      .map(key => {
        return {
          label: key,
          data: MapboxGL.StyleURL[key],
        };
      })
      .sort(onSortOptions);

    this.state = {
      styleURL: this._mapOptions[0].data,
      // ejemplo customIcon
      featureCollection: featureCollection([]),
    };

    this.onMapChange = this.onMapChange.bind(this);
    this.onUserMarkerPress = this.onUserMarkerPress.bind(this);
    
    // ejemplo customIcon
    this.onPress = this.onPress.bind(this);
    this.onSourceLayerPress = this.onSourceLayerPress.bind(this);
  }

  // ejemplo customIcon
  async onPress(e) {
    const aFeature = feature(e.geometry);
    aFeature.id = `${Date.now()}`;

    this.setState({
      featureCollection: featureCollection([
        ...this.state.featureCollection.features,
        aFeature,
      ]),
    });
  }

  onSourceLayerPress({features, coordinates, point}) {
    console.log(
      'You pressed a layer here are your features:',
      features,
      coordinates,
      point,
    );
  }

  componentDidMount() {
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.stop();
  }

  onMapChange(index, styleURL) {
    this.setState({styleURL});
  }

  onUserMarkerPress() {
    Alert.alert('You pressed on the user location annotation');
  }

  render() {
    return (
      // <TabBarPage
      // {...this.props}
      // scrollable
      // options={this._mapOptions}
      // onOptionPress={this.onMapChange}>
      //   <MapboxGL.MapView
      //     styleURL={this.state.styleURL}
      //     style={sheet.matchParent}>
      //     <MapboxGL.Camera followZoomLevel={12} followUserLocation />


      //    {/* <MapboxGL.UserLocation onPress={this.onUserMarkerPress} /> */}
      //    </MapboxGL.MapView>
      // </TabBarPage>

      <Page {...this.props}>
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          onPress={this.onPress}
          style={sheet.matchParent}>
          <MapboxGL.Camera
            zoomLevel={9}
            centerCoordinate={[-73.970895, 40.723279]}
          />

          <MapboxGL.ShapeSource
            id="symbolLocationSource"
            hitbox={{width: 20, height: 20}}
            onPress={this.onSourceLayerPress}
            shape={this.state.featureCollection}>
            <MapboxGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={styles.icon}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>

        <Bubble>
          <Text>Tap to add an icon</Text>
        </Bubble>
      </Page>

    );
  }
}

const styles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
  },
};