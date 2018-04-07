import { YOUTUBE_VIDEO_URL } from '../constants'

export const getYoutubeUrl = (videoId) => (YOUTUBE_VIDEO_URL+videoId);

export const getChannelUrl = (channelId) => (`https://youtube.com/channel/${channelId}`);
