from __future__ import unicode_literals

import re

from lxml import etree

__all__ = ['process_data']

data_keys = ['text', 'title', 'description']


def extract_data(data):
    return [data[item].encode('utf-8') for item in data_keys]


def clean_index_value(text):
    return re.sub(r'\s+', ' ', text).strip()


def process_data(data):
    xml, title, description = extract_data(data)
    text = etree.fromstring(xml).xpath('string()')

    text = clean_index_value(text)
    title = clean_index_value(title)
    description = clean_index_value(description)
    return dict(zip(data_keys, [text, title, description]))
