import React from 'react';
// import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react';
import { connect } from 'react-redux';
import { Media, Image, Grid, Row, Col, Pagination, Button } from 'react-bootstrap';
import _ from 'lodash';

import actions from '../actions/actions';
import PageLayout from './PageLayout.jsx';
import SearchBar from './SearchBar.jsx';
import PageTitle from './PageTitle.jsx';

import {getYoutubeUrl} from '../utils';


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
			preview
		} = this.props;

		return (
			<div className="video-preview"
				onMouseOver={this.handleMouseOver}
				onMouseOut={this.handleMouseOut}>
				{
					// TODO: move to separate components
					this.state.isHovering && preview.exists
					? <video loop autoPlay width="256" height="auto"
						poster={thumbnail.url} >
						<source src={preview.url} type="video/webm"></source>
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
    publishDate,
    channelInfo,
		preview
    // tags
  } = props;
	const videoUrl = getYoutubeUrl(id);
	return (
    <div className="video">
      <Grid>
        <Row>
          <Col md={3}>
            <VideoPreview thumbnail={thumbnail} preview={preview}/>
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
								Author: {channelInfo.name}
							</Col>
							<Col md={4}>
								Published: {publishDate}
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
