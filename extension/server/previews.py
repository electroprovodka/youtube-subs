import youtube_dl
import ffmpy
import subprocess
import boto3
import os
import time

from django.conf import settings

from .models import Video


def _get_video_info(video_id, fields=['url', 'duration']):
    # TODO: handle errors
    url = settings.YOUTUBE_VIDEO_URL.format(video_id=video_id)
    with youtube_dl.YoutubeDL(settings.PREVIEW_PROCESSING_OPTIONS) as ydl:
        res = ydl.extract_info(url, download=False)
    return {k: res[k] for k in fields}


def _get_video_preview(url, start, preview_duration=5):
    # TODO: handle errors
    # TODO: check how to use this with docker
    # TODO: find best encoding props
    ff = ffmpy.FFmpeg(
        inputs={url: '-ss {}'.format(start)},
        outputs={
            'pipe:1': (
                '-t {duration} ' # duration of cutted snippet
                '-codec:v libvpx ' # video codec
                '-quality realtime -cpu-used 0 ' # processing options
                #'--threads 4 ' # Number of threads - set to the number of CPU cores
                #'-b:v 500k ' # desired output video bitrate
                #'-qmin 10 -qmax 42 ' # quantization levels (0-63) - lower better
                #'-maxrate 500k '
                #'-bufsize 1M ' # twice as max rate to have buffer for 2 seconds
                '-vf scale=-1:480 ' # new video size (-1 means save proportions)
                #'-codec:a libvorbis -b:a 128k ' # audio codec
                '-f webm '  # used to specify encoding from pipe
                .format(duration=preview_duration)
            )
        }
    )
    f, err = ff.run(stdout=subprocess.PIPE)
    return f


def _fetch_preview(video_id):
    # TODO: check the logic of snippet length gen
    info = _get_video_info(video_id)
    url, duration = info['url'], info['duration']
    preview_start = 10 if duration > 20 else duration / 4
    preview_duration = 5 if duration > 10 else duration / 2
    return _get_video_preview(url, preview_start, preview_duration)


def _save_preview(filename, preview):
    # TODO: require secrets in env
    s3 = boto3.resource(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY,
        aws_secret_access_key=settings.AWS_SECRET_KEY,
    )
    filepath = os.path.join(settings.S3_PREVIEWS_FOLDER, filename)
    s3.Object(settings.S3_BUCKET_NAME, filepath).put(Body=preview, ACL='public-read')
    return os.path.join(settings.S3_BASE_URL, settings.S3_BUCKET_NAME, filepath)


def _generate_filename():
    return str(int(time.time())) + '.webm'


def create_preview(video_id):
    preview = _fetch_preview(video_id)
    filename = _generate_filename()
    return _save_preview(filename, preview)

