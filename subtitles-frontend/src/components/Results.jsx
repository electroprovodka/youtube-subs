import React from 'react';
import moment from 'moment/moment';
// import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react';
import { connect } from 'react-redux';
import { Media, Image, Grid, Row, Col, Pagination, Button } from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions/actions';
import PageLayout from './PageLayout.jsx';
import SearchBar from './SearchBar.jsx';
import PageTitle from './PageTitle.jsx';

import {getYoutubeUrl, getChannelUrl } from '../utils';


const Description = ({text}) => {
	const newText = text.length > 200 ? text.slice(0, 197) + '...' : text;
	return (
    <div className="description">
      {newText}
    </div>
	);
};

class VideoPreview extends React.Component {
	constructor() {
		super();
		this.state = {
			isHovering: false
		};

		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	handleMouseOver() {
		this.setState({ isHovering: true });
	}

	handleMouseOut() {
		this.setState({ isHovering: false });
	}

	render() {
		const {
			thumbnail,
			previewUrl
		} = this.props;

		return (
			<div className="video-preview"
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{
					// TODO: move to separate components
					this.state.isHovering && previewUrl
					? <video loop autoPlay width="256" height="auto"
						poster={thumbnail.url} >
						<source src={previewUrl} type="video/webm"></source>
					</video>
					: <Image width={256}
						src={thumbnail.url} thumbnail responsive />
				}
			</div>
		);
	}
}

const Video = (props) => {
	const {
    id,
    title,
    description,
    thumbnail,
    publishedAt,
    channelName,
		channelId,
		previewExists,
		previewUrl
    // tags
  } = props;
	const videoUrl = getYoutubeUrl(id);
	const channelUrl = getChannelUrl(channelId);
	return (
    <div className="video">
      <Grid>
        <Row>
          <Col md={3}>
            <VideoPreview thumbnail={thumbnail} previewUrl={previewUrl}/>
          </Col>
          <Col md={9}>
            <Row className="title">
            	<Button bsStyle="link" target="_blank" href={videoUrl}>
								<Media.Heading>{title}</Media.Heading>
							</Button>
            </Row>
            <Row className="description">
              <Description text={description}/>
            </Row>
						<Row className="bottom-line">
							<Col md={3}>
								<Button bsStyle="link" target="_blank" href={channelUrl}>
									<Media.Heading>Author: {channelName}</Media.Heading>
								</Button>
							</Col>
							<Col md={4}>
								Published: {moment(publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
							</Col>
						</Row>
          </Col>
        </Row>
      </Grid>
    </div>
	);
};


const VideosList = ({videos}) => {
	const renderVideo = (video) => <Video key={_.get(video, 'id')} {...video} />;
	return (
    <div className="videos-list">
      {_.map(videos, renderVideo)}
    </div>
	);
};

const TotalLenghtMessage = ({length}) => {
	const result_word = length === 1 ? 'result': 'results';
	return (
		<p><strong>{length} {result_word} found:</strong></p>
	);
};

const ResultsPageLayout = ({query, videos, totalLength, page, totalPages, updateQuery, submitSearch, requestPage}) => {
	return (
		<PageLayout>
	    <div className="results">
				<PageTitle size="small"/>
	      <SearchBar query={query} onChange={updateQuery} onSubmit={submitSearch} />
				<TotalLenghtMessage length={totalLength}/>
	      <VideosList videos={videos}/>
				<Pagination
					prev next ellipsis boundaryLinks maxButtons={5}
					activePage={page} items={totalPages} onSelect={requestPage}
					/>
	    </div>
		</PageLayout>
	);
};

const mapStateToProps = ({data: {query, videos, totalLength, page, totalPages}}) => ({query, videos, totalLength, page, totalPages});
export default connect(mapStateToProps, actions)(ResultsPageLayout);
