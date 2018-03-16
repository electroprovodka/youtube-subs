from __future__ import unicode_literals

import re

from lxml import etree

__all__ = ['process_data']

data_keys = ['text', 'title', 'description']


def process_text(text):
    """
    Processes text data
    """
    return re.sub(r'\s+', ' ', text).strip()


def process_xml(xml):
    """
    Process subtitles xml data
    """
    text = etree.fromstring(xml.encode('utf-8')).xpath('string()')
    return process_text(text)


def extract_data(data):
    """
    Extract all necessary data and encodes it to utf-8
    :param data: payload
    :return: encoded payload data
    """
    return [data[item] for item in data_keys]


def process_data(data):
    """
    Process payload from extension
    :param data:
    :return: dict of processed data
    """
    xml, title, description = extract_data(data)
    return {
        'text': process_xml(xml),
        'title': process_text(title),
        'description': process_text(description)
    }
