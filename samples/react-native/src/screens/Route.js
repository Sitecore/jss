import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Text, View, RefreshControl } from 'react-native';
import { SitecoreContext } from '@sitecore-jss/sitecore-jss-react-native';
// eslint-disable-next-line
import { getRouteData } from 'data-service';
import componentFactory from '../componentFactory';

/**
 * Page wrapper. Performs data loading depends on current route
 */
class Route extends Component {
	state = {
		loading: true,
		route: null,
		error: null
	};

	loadData = () => {
		const { path } = this.props

		getRouteData(path)
			.then((data) => {
				this.setState({ route: data, loading: false });
			})
			.catch((err) => {
				console.error(err);
				this.setState({ error: err, loading: false });
			});
	}

	componentDidMount() {
		const { path } = this.props

		path && this.loadData();
	}

	render() {
		const { render } = this.props

		if (this.state.loading) {
			return (
				<View>
					<Text>loading...</Text>
				</View>
			);
		}

		if (this.state.error) {
			return (
				<View>
					<Text>{this.state.error.toString()}</Text>
				</View>
			);
		}

		const refreshControl = (
			<RefreshControl refreshing={this.state.loading} onRefresh={this.loadData} />
		);

		return (
			<SitecoreContext componentFactory={componentFactory}>
				{render({ data: this.state.route, refreshControl })}
			</SitecoreContext>
		);
	}
}

Route.propTypes = {
	path: PropTypes.string.isRequired,
	render: PropTypes.func.isRequired
}

export default Route;
