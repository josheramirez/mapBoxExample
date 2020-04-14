import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

import colors from '../src/styles/colors';

const styles = StyleSheet.create({
  label: {
    fontSize: 24,
    color: colors.secondary.white,
  },
  container: {
    borderBottomWidth: 0,
  },
});

class MapHeader extends React.PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    statusBarColor: PropTypes.string,
    statusBarTextTheme: PropTypes.string,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    statusBarTextTheme: 'light-content',
    statusBarColor: colors.primary.blueDark,
    backgroundColor: colors.primary.blue,
  };

  render() {
    const statusBarProps = {
      barStyle: this.props.statusBarTextTheme,
      backgroundColor: this.props.statusBarColor,
    };

    return (
      <Header
        placement="left"
        backgroundColor={this.props.backgroundColor}
        statusBarProps={statusBarProps}
        containerStyle={styles.container}
        leftComponent={{
          icon: this.props.onBack ? 'arrow-back' : '',
          onPress: this.props.onBack,
          color: colors.secondary.white,
          underlayColor: this.props.backgroundColor,
        }}
        centerComponent={{text: this.props.label, style: styles.label}}
      />
    );
  }
}

export default MapHeader;
